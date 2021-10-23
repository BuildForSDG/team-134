
import React, { Component } from 'react';
import {ProgressBar} from 'primereact/progressbar';
import {Growl} from 'primereact/growl';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {BinsService} from '../services/bins';
import {convertISOToLocalTime} from '../utils/helpers';
import socketIOClient from "socket.io-client";
import '../layout/bins.css';


export class Bins extends Component {
  constructor(props){
    super(props);
    this.binsList = [];
    this.state = {
      selectedBin: null, actualBin: null, dataLoading: true, simValue: 0, lastEmptied: '',
      displayDialog: false, displayDialogSpinner: false, displayAddDialog: false, showEditDialog: false,
      displayDeleteDialog: false, inpBinCode: '', inpLocation: '', inpMaxHeight: '',
      extSimRunning: false
    };
    this.userId = sessionStorage.getItem('userId');
    const authToken = sessionStorage.getItem('authToken');
    this.binsService = new BinsService(authToken, this.userId);
    // this.socket = socketIOClient('http://localhost:5000/',{
    //   transports: ['websocket']
    // });
    this.socket = socketIOClient();

    // this.socketIOClient = null;
    // if(process.REACT_APP_ENV === 'development'){
    //   // this.socketIOClient = socketIOClient('http://localhost:5000/'); 
    //   this.socket = socketIOClient.connect();
    // }else{
    //   this.socket = socketIOClient.connect(); // defaults to the url the website is served from
    // }
  }

  async componentDidMount(){
    try {
      // const response = await this.binsService.getBin('5ee06b5701b60d00175c77ad');
      const response = await this.binsService.getAllBins();
      this.binsList = response.data;
      this.setState({dataLoading: false});
      // if(response.data.current_height >= 99){
      //   this.setState({actualBin: response.data, actualFull: true, dataLoading: false});
      // }else{
      //   this.setState({actualBin: response.data, dataLoading: false});
      // }
    } catch (error) {
      this.handleError(error);
    }

    this.socket.on('bin', ({binId, height}) => {
      const bin = this.state.actualBin;
      bin.current_height = height;
      if(height < 99){
        this.setState({actualBin: bin});
      }else{
        bin.current_height = 100;
        this.setState({actualBin: bin});
        const msg = 'Bin Full';
        this.growl.show({severity: 'info', detail: 'BIN-SIMUL', summary: msg, sticky: true});
      }
    });

    this.socket.on('binSimulation', (simulHeight) =>{
      if(!this.state.extSimRunning){
        this.setState({simValue: simulHeight, extSimRunning: true});
        // set flag that another instance of app is currently running simulation, so cannot run
      }else{
        if(simulHeight < 99){
          this.setState({simValue: simulHeight});
        }else{
          this.setState({simValue: 100, extSimRunning: false});
          const msg = 'Bin Full';
          this.growl.show({severity: 'info', detail: 'BIN-SIMUL', summary: msg, sticky: true});
        }
      }
    });
  }

  componentWillUnmount(){
    this.socket.disconnect(); // cleanup to prevent memory leaks
  }

  handleError = (error) =>{
    if(error.response){
      if(error.response.status === 401){
        const msg = 'Authorization Error. Please login again';
        this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: true});     
      }else{
        const msg = 'Server Error. Please refresh the page';
        this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: true});
      }
    }else{
      const msg = 'Network Error. Please refresh the page';
      this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: true});   
    }
  }

  setEmptiedClick = () =>{
    this.setState({displayDialog: true});
  }

  onConfirmDialog = async () =>{
    try {
      const data = { current_height: 0 };
      const response = await this.binsService.setBinEmptied('5ee06b5701b60d00175c77ad', data);
      let bin = this.state.actualBin;
      bin.lastEmptied = new Date().toISOString();
      this.setState({actualBin: bin, displayDialog: false, displayDialogSpinner: false});
    } catch (error) {
      this.handleError(error);
    }
  }

  onHideDialog = () => {
    this.setState({displayDialog: false});
  }

  simulateBinAPI = () => {
    if(this.state.simValue > 0){
      this.setState({simValue: 0}); // reset
    }
    this.interval = setInterval(async () => {
      let val = this.state.simValue;
      val += Math.floor(Math.random() * 20) + 10;

      if(val >= 100) {
          val = 100;
          this.growl.show({severity: 'info', detail: 'BIN-SIMUL', summary: 'Bin Full', sticky: true});
          clearInterval(this.interval);
      }

      this.setState({ simValue: val });
      // this.socket.emit('binSimulation', {userId: this.userId, simulHeight: val });
      try {
        const data = {
          update: { current_height: val },
          meta: { bin_code: this.state.actualBin.bin_code}
        }
        await this.binsService.updateBin('5ee06b5701b60d00175c77ad', data);
      } catch (error) {
      }
    }, 2000);
  }

  simulateBin = () =>{
    if(this.state.simValue > 0){
      this.setState({simValue: 0}); // reset
    }
    this.interval = setInterval(() => {
      let val = this.state.simValue;
      val += Math.floor(Math.random() * 10) + 1;

      if(val >= 100) {
          val = 100;
          this.growl.show({severity: 'info', detail: 'BIN-SIMUL', summary: 'Bin Full', sticky: true});
          clearInterval(this.interval);
      }

      this.setState({ simValue: val });
      this.socket.emit('binSimulation', {userId: this.userId, simulHeight: val });
    }, 1000);
  }

  displayValueTemplate = (value) => {
    return (
        <React.Fragment>
          {value >= 99 && <b>Full</b>}
          {value < 99 && <>{value}/<b>%</b></>}
        </React.Fragment>
    );
  }

  renderAddItemDialog = ()=>{
    const { displayAddDialog, displayDialogSpinner } = this.state;
    const footer = (
        <>
        { displayDialogSpinner && <div style={{float: "left", marginTop: '2%'}}>Please wait... &nbsp;
            <ProgressSpinner style={{ width: '20px', height: '20px', float: 'right'}} strokeWidth="6"/>            
        </div> }
        <Button label="Submit" icon="pi pi-check" onClick={this.submitAdd} disabled={displayDialogSpinner} />
        <Button label="Cancel" icon="pi pi-times" className="p-button-danger" disabled={displayDialogSpinner}
          onClick={(e) => this.setState({displayAddDialog: false})}/>
        </>);

    const title = "Create Bin";
    //TODO: FIX WARNING ON CONTROLLED INPUTS
    
    return(
        <Dialog header={title} footer={footer} visible={displayAddDialog} className="edit-dialog" modal={true} style={{'width': '40%'}} closable={false}
            onHide={(e) => this.setState({displayAddDialog: false})}>
            <div className="orient-vertical">
                <div className="orient-horiz">
                  <span>Bin Code:</span>
                  <InputText value={this.state.inpBinCode} className="right-align p-inputtext" placeholder="Identifier for bin"
                    onChange={(e) => this.setState({inpBinCode: e.target.value})}/>
                </div>
                <div className="orient-horiz">
                  <span>Location:</span>
                  <InputText value={this.state.inpLocation} className="right-align" placeholder="e.g. XYZ Plaza"
                    onChange={(e) => this.setState({inpLocation: e.target.value})}/>
                </div>
                <div className="orient-horiz">
                  <span>Threshold Height:</span>
                  <InputText value={this.state.inpMaxHeight} keyfilter="pnum" className="right-align" placeholder="Max expected height in cm"
                    onChange={(e) => this.setState({inpMaxHeight: e.target.value})}/>
                </div>
            </div>
        </Dialog>
    );
  }

  submitAdd = async () => {
    const { inpBinCode, inpLocation, inpMaxHeight } = this.state;
    if(inpBinCode.length === 0 || inpLocation.length === 0 || inpMaxHeight.length === 0){
      this.growl.show({severity: 'error', summary: 'Problem', detail: 'Please fill in all fields'});
      return;
    }
    try {
      this.setState({displayDialogSpinner: true});
      const data = { bin_code: inpBinCode, location: inpLocation, min_height: inpMaxHeight,
                     max_weight: 50, lng: '24', lat: '45' }; // dummy data
      const response = await this.binsService.createBin(data);
      this.binsList.push(response.data);
      this.growl.show({severity: 'success', summary: 'Success', detail: 'Bin Added'});
      this.setState({displayDialogSpinner: false, displayAddDialog: false});
    } catch (error) {
      if(error.response && error.response.status === 500 && error.response.data 
        && error.response.data.message && error.response.data.message.includes('E11000') ){
        this.growl.show({severity: 'error', summary: 'Error', detail: 'Bin Code already in use'});
      } else{
        this.handleError(error);
      }
      this.setState({displayDialogSpinner: false});
    }
    
  }

  renderEditItemDialog = () => {
    const { showEditDialog, displayDialogSpinner } = this.state;
    const footer = (
      <>
      {displayDialogSpinner && <div style={{ float: "left", marginTop: '2%'}}>Please wait... &nbsp;
          <ProgressSpinner style={{ width: '20px', height: '20px', float: 'right'}} strokeWidth="6"/>            
      </div>}
      <Button label="Submit" icon="pi pi-check" onClick={this.submitEdit} disabled={displayDialogSpinner}/>
      <Button label="Cancel" icon="pi pi-times" onClick={(e) => this.setState({showEditDialog: false})} className="p-button-danger" disabled={displayDialogSpinner}/>
      </>
    );

    const header = (<div>Edit Bin</div> );

    return(
      <Dialog header={header} footer={footer} visible={showEditDialog} className="edit-dialog" modal={true} style={{'width': '40%'}} closable={false}
          onHide={(e) => this.setState({showEditDialog: false})}>
          <div className="orient-vertical">
            <div className="orient-horiz">
              <span>Bin Code:</span>
              <InputText value={this.state.inpBinCode} className="right-align p-inputtext" placeholder="Identifier for bin"
                onChange={(e) => this.setState({inpBinCode: e.target.value})}/>
            </div>
            <div className="orient-horiz">
              <span>Location:</span>
              <InputText value={this.state.inpLocation} className="right-align" placeholder="e.g. XYZ Plaza"
                onChange={(e) => this.setState({inpLocation: e.target.value})}/>
            </div>
            <div className="orient-horiz">
              <span>Threshold Height:</span>
              <InputText value={this.state.inpMaxHeight} keyfilter="pnum" className="right-align" placeholder="Max expected height in cm"
                onChange={(e) => this.setState({inpMaxHeight: e.target.value})}/>
            </div>
          </div>
      </Dialog>
    );
  }

  submitEdit = async () => {
    const { selectedBin, inpBinCode, inpLocation, inpMaxHeight } = this.state;
    if(inpBinCode.length === 0 || inpLocation.length === 0 || inpMaxHeight.length === 0){
      this.growl.show({severity: 'error', summary: 'Problem', detail: 'Please fill in all fields'});
      return;
    }
    if(inpBinCode === selectedBin.bin_code && inpLocation === selectedBin.location && inpMaxHeight === selectedBin.min_height){
      this.growl.show({severity: 'error', summary: 'Problem', detail: 'Nothing to update'});
      return;
    }
    try {
      this.setState({displayDialogSpinner: true});
      const update = { bin_code: inpBinCode, location: inpLocation, min_height: inpMaxHeight };
      const data = { update };
      await this.binsService.updateBin(selectedBin._id, data);
      selectedBin.bin_code = inpBinCode;selectedBin.location = inpLocation;selectedBin.min_height = parseInt(inpMaxHeight);
      this.setState({displayDialogSpinner: false, showEditDialog: false});
      this.growl.show({severity: 'success', summary: 'Success', detail: 'Bin Updated'});
    } catch (error) {
      if(error.response && error.response.status === 500 && error.response.data 
        && error.response.data.message && error.response.data.message.includes('E11000') ){
        this.growl.show({severity: 'error', summary: 'Error', detail: 'Bin Code already in use'});
      } else{
        this.handleError(error);
      }
      this.setState({displayDialogSpinner: false});
    }
  }

  renderDeleteDialog = () => {
    const { displayDialogSpinner, displayDeleteDialog, selectedBin } = this.state;
    const dialogMessage = (<>Confirm that {selectedBin.bin_code} is to be deleted.<br/>Proceed?</>)
    const dialogFooter = (
      <>
        { displayDialogSpinner && <div style={{float: "left", marginTop: '2%'}}>Please wait... &nbsp;
        <ProgressSpinner style={{ width: '20px', height: '20px', float: 'right'}} strokeWidth="6"/>            
        </div> }
        <Button label="Yes" icon="pi pi-check" onClick={this.confirmDelete} disabled={displayDialogSpinner}/>
        <Button label="Cancel" icon="pi pi-times" onClick={() => {this.setState({displayDeleteDialog: false})}} className="p-button-danger" disabled={displayDialogSpinner}/>
    </>);
    return(
      <Dialog header={<>Delete Bin</>} footer={dialogFooter} visible={displayDeleteDialog} 
        width="350px" modal={true} onHide={() => {this.setState({displayDeleteDialog: false})}} closable={false}>
        {dialogMessage}
      </Dialog>
    );
  }

  confirmDelete = async () => {
    this.setState({displayDialogSpinner: true});
    const { selectedBin } = this.state;
    try {
      await this.binsService.deleteBin(selectedBin._id);
      let indexToDelete = -1;
      for(let i = 0; i < this.binsList.length; i++){
        if(this.binsList[i]._id === selectedBin._id){
          indexToDelete = i;
          break;
        }
      }
      this.binsList.splice(indexToDelete, 1);
      this.setState({displayDialogSpinner: false, displayDeleteDialog: false});
      this.growl.show({severity: 'success', summary: 'Success', detail: 'Bin Deleted'});
    } catch (error) {
      this.handleError(error);
    }
  }

  renderBinsList = () =>{
    const cards = this.binsList.map((bin) =>
      <div className="card summary bin-card" key={bin._id}>
        <span className="title">{bin.bin_code}</span>
        { bin._id !== '5ee06b5701b60d00175c77ad' && <div style={{float: 'right'}}>
        <Button icon="pi pi-pencil" tooltip="Edit Bin Details" onClick={(e) => { 
            this.setState({selectedBin: bin, inpBinCode: bin.bin_code, inpLocation: bin.location, inpMaxHeight: bin.min_height, showEditDialog: true}) }} />
        <Button icon="pi pi-trash" tooltip="Delete Bin" onClick={(e) => { this.setState({selectedBin: bin, displayDeleteDialog: true}) } } className="p-button-danger" style={{marginLeft:'5px'}}/> 
        </div> }
        {bin.min_height === 0 && <span className="detail">Max Height: 17cm</span>}
        {bin.min_height > 0 && <span className="detail">Max Height: {bin.min_height}cm</span>}
        {!bin.location && <span className="detail">Location: Kencom Stage</span>}
        {bin.location && <span className="detail">Location: {bin.location}</span>}
        {bin.lastEmptied && <span className="detail">Last Emptied: {convertISOToLocalTime(bin.lastEmptied)}</span>}
        {!bin.lastEmptied && <span className="detail">Last Emptied: Never</span>}
        <ProgressBar value={parseFloat(bin.current_height.toFixed(2))} displayValueTemplate={this.displayValueTemplate} style={{marginTop: '15px'}}></ProgressBar>
        {bin.current_height >=99 && <Button label="Set Emptied" onClick={this.setEmptiedClick} style={{marginTop: '20px'}} className="p-button-success p-button-raised"/>}
      </div>
    );
    return (cards);
  }

  render(){
    const { dataLoading, simValue, displayDialog, displayDialogSpinner, displayAddDialog, showEditDialog,
            displayDeleteDialog, extSimRunning, selectedBin } = this.state;
    const dialogFooter = (
      <>
        { displayDialogSpinner && <div style={{float: "left", marginTop: '2%'}}>Please wait... &nbsp;
        <ProgressSpinner style={{ width: '20px', height: '20px', float: 'right'}} strokeWidth="6"/>            
        </div> }
        <Button label="Yes" icon="pi pi-check" onClick={this.onConfirmDialog} disabled={displayDialogSpinner}/>
        <Button label="Cancel" icon="pi pi-times" onClick={this.onHideDialog} className="p-button-danger" disabled={displayDialogSpinner}/>
    </>);
  // const dialogHeader = (binCode);
  const dialogMessage = (<>Confirm that this bin has been emptied<br/>Proceed?</>)
    return(
      <div className="p-fluid dashboard">
        <Growl ref={(el) => this.growl = el} />
        { dataLoading && <ProgressSpinner strokeWidth='1' style={{marginTop:'10%', width: '20%', height:'20%'}}/>}

        { !dataLoading && 
          <>
          {/* <div className="p-clearfix" style={{'lineHeight':'1.87em', marginLeft: '4%'}}>
            <Button label="Add Bin" onClick={(e) => this.setState({displayAddDialog: true})} icon="pi pi-fw pi-plus-circle" style={{'float':'right'}}></Button> 
          </div> */}
          <Button label="Add Bin" onClick={(e) => this.setState({displayAddDialog: true, inpBinCode: '', inpLocation: '', inpMaxHeight: ''})} icon="pi pi-fw pi-plus-circle" style={{marginLeft: '4%', width: '20%'}}></Button> 
          <div className="bins-content">
            <div className="card summary bin-card">
              <span className="title">BIN-SIMUL</span>
              <span className="detail">Max Height: 50cm</span>
              <span className="detail">Location: Simulated</span>
              <ProgressBar value={simValue} displayValueTemplate={this.displayValueTemplate} style={{marginTop: '10px'}}></ProgressBar>
              {!extSimRunning && <Button label="Simulate" className="p-button-success p-button-raised" onClick={this.simulateBin} style={{marginTop: '20px'}}/>}
              {extSimRunning && <span className="detail">Another user is simulating. Please wait ...</span>}
            </div>
            
          {  this.renderBinsList() }
          { displayAddDialog && this.renderAddItemDialog() }
          { showEditDialog && this.renderEditItemDialog() }
          { displayDeleteDialog && this.renderDeleteDialog() }

          </div>
          </>}
        <Dialog header={selectedBin && selectedBin.bin_code} footer={dialogFooter} visible={displayDialog} 
          width="350px" modal={true} onHide={this.onHideDialog} closable={false}>
          {dialogMessage}
        </Dialog>
      </div>
    );
  }
};
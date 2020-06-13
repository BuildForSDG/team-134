
import React, { Component } from 'react';
import {ProgressBar} from 'primereact/progressbar';
import {Growl} from 'primereact/growl';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {BinsService} from '../services/bins';
import {convertISOToLocalTime} from '../utils/helpers';
import socketIOClient from "socket.io-client";
import '../layout/bins.css';


export class Bins extends Component {
  constructor(props){
    super(props);
    this.state = {
      actualBin: null, dataLoading: true, simValue: 0, actualFull: false, lastEmptied: '',
      displayDialog: false, displayDialogSpinner: false, extSimRunning: false
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
      const response = await this.binsService.getBin('5ee06b5701b60d00175c77ad');
      if(response.data.current_height >= 99){
        this.setState({actualBin: response.data, actualFull: true, dataLoading: false});
      }else{
        this.setState({actualBin: response.data, dataLoading: false});
      }
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

  render(){
    const { actualBin, dataLoading, simValue, actualFull, displayDialog, displayDialogSpinner,
            extSimRunning } = this.state;
    let binHeight, lastEmptied, binCode;
    if(actualBin != null){
      binHeight = actualBin.current_height.toFixed(2);
      binCode = actualBin.bin_code;
      binHeight = parseFloat(binHeight);
      if(actualBin.lastEmptied == null){
        lastEmptied = 'Never';
      }else{
        lastEmptied = convertISOToLocalTime(actualBin.lastEmptied)
      }
    }
    const dialogFooter = (
      <>
        { displayDialogSpinner && <div style={{float: "left", marginTop: '2%'}}>Please wait... &nbsp;
        <ProgressSpinner style={{ width: '20px', height: '20px', float: 'right'}} strokeWidth="6"/>            
        </div> }
        <Button label="Yes" icon="pi pi-check" onClick={this.onConfirmDialog} disabled={displayDialogSpinner}/>
        <Button label="Cancel" icon="pi pi-times" onClick={this.onHideDialog} className="p-button-danger" disabled={displayDialogSpinner}/>
    </>);
  const dialogHeader = (binCode);
  const dialogMessage = (<>Confirm that this bin has been emptied<br/>Proceed?</>)
    return(
      <div className="p-grid p-fluid dashboard">
        <Growl ref={(el) => this.growl = el} />
        { dataLoading && <ProgressSpinner strokeWidth='1' style={{marginTop:'10%', width: '20%', height:'20%'}}/>}

        { !dataLoading && <div className="bins-content">
            <div className="card summary bin-card">
                <span className="title">{actualBin.bin_code}</span>
                <span className="detail">Max Height: 17cm</span>
                <span className="detail">Location: Kencom Stage</span>
                <span className="detail">Last Emptied: {lastEmptied}</span>
                <ProgressBar value={binHeight} displayValueTemplate={this.displayValueTemplate} style={{marginTop: '15px'}}></ProgressBar>
                {actualFull && <Button label="Set Emptied" onClick={this.setEmptiedClick} style={{marginTop: '20px'}} className="p-button-success p-button-raised"/>}
            </div>
            <div className="card summary bin-card">
                <span className="title">BIN-SIMUL</span>
                <span className="detail">Max Height: 50cm</span>
                <span className="detail">Location: Simulated</span>
                <ProgressBar value={simValue} displayValueTemplate={this.displayValueTemplate} style={{marginTop: '10px'}}></ProgressBar>
                {!extSimRunning && <Button label="Simulate" className="p-button-success p-button-raised" onClick={this.simulateBin} style={{marginTop: '20px'}}/>}
                {extSimRunning && <span className="detail">Another user is simulating. Please wait ...</span>}
            </div>
        </div>}
        <Dialog header={dialogHeader} footer={dialogFooter} visible={displayDialog} 
          width="350px" modal={true} onHide={this.onHideDialog} closable={false}>
          {dialogMessage}
        </Dialog>
      </div>
    );
  }
};
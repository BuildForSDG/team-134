
import React, { Component } from 'react';
import { UserService } from '../services/users';
import {Growl} from 'primereact/growl';
import {ProgressBar} from 'primereact/progressbar';

import '../layout/signin.css';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      emailInput: '', passInput: '', displayLoading: false
    };
    this.userService = new UserService();
  }

  componentDidMount(){
    
  }

  handleEmailInput = (e) =>{
    this.setState({emailInput: e.target.value});
  }

  handlePassInput = (e) =>{
    this.setState({passInput: e.target.value});
  }

  login = async () =>{
    const {emailInput, passInput } = this.state;
    if(emailInput.length === 0 || passInput.length === 0){
      const msg = 'Please fill in all fields'
      this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: false});     
      return;        
    }
    try {
      this.setState({ displayLoading: true});
      const response = await this.userService.login(emailInput, passInput);
      sessionStorage.setItem('userId', response.data.id);
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('userName', response.data.username);
      window.location = '#/dashboard';
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          const msg = 'Account not found. Enter correct details or Sign Up';
          this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: true});     
        }else{
          this.growl.show({severity: 'error', summary: 'Error', detail: 'Server Error', sticky: true});     
        }
      }else{
        this.growl.show({severity: 'error', summary: 'Error', detail: 'Server Error', sticky: true});     
      }
    }
    this.setState({ displayLoading: false});
  }

  cancel = () =>{
    this.props.renderHome(false);
  }

  render(){
    const { displayLoading } = this.state;
    return(
      <div className="signin-body">
        <Growl ref={(el) => this.growl = el} />
        <p className="c ">Login to access dashboard</p>

        <div className="signin-form">
          <form style={{ border: "1px solid #ccc"}}>
            <div className="container" style={{paddingBottom: '5%'}}>
              <p className="c">Please fill in this form.</p>
              <hr/>

              <label htmlFor="email"><b>Email</b></label>
              <input type="text" placeholder="Enter Email" name="email" required 
                onChange={this.handleEmailInput} value={this.state.emailInput}/>

              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required 
                onChange={this.handlePassInput} value={this.state.passInput}/>

              {!displayLoading && <div className="clearfix">
                  <button type="button" className="cancelbtn" onClick={this.cancel}>Cancel</button>
                  <button type="button" className="signupbtn" onClick={this.login}>Login</button>
              </div>}
              { displayLoading && <ProgressBar mode="indeterminate" style={{height: '6px'}} /> }
            </div>
          </form>
        </div>

      </div>
    )
  }
}
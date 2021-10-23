
import React, { Component } from 'react';
import { Button } from 'primereact/button';
import {Growl} from 'primereact/growl';

import { SignUp } from './SignUp';
import { Login } from './Login';

import '../layout/home.css'

export class Home extends Component {
  constructor(){
    super();
    this.state = {
      displayHome: true, displaySignUp: false, displayLogin: false
    };
  }

  componentDidMount(){
    
  }

  renderHome = (signedUp) => {
    this.setState({displayHome: true, displaySignUp: false, displayLogin: false});
    if(signedUp){
      const msg = 'Account created. Login to proceed';
      this.growl.show({severity: 'success', summary: 'Success', detail: msg, sticky: true});     
    }
  }

  renderLogin = () => {
    const userId = sessionStorage.getItem('userId');
    const authToken = sessionStorage.getItem('authToken');
    if(userId == null || authToken == null){
      this.setState({displayHome: false, displaySignUp: false, displayLogin: true});
    }else{
      // TODO: load for a short while (hack)
      window.location = '#/dashboard';
    }
  }

  renderSignup = () => {
    this.setState({displayHome: false, displaySignUp: true, displayLogin: false});
  }

  render(){
    const { displayHome, displayLogin, displaySignUp } = this.state;
    return(
      <div style={{ paddingTop: '5%' }}>
        <Growl ref={(el) => this.growl = el} />
        {displayHome && <div>
          <h1>Introducing PingBin</h1>
          <h2>A Smart Solution To Improve Garbage Collection</h2>
          <p className="a ">We proudly introduce our smart bin service that requests for pick up once it's full.</p>
          <p className="a ">Put the garbage in the bin, we'll take the tin.</p>
          <div className="btn-holder">
            <Button label="Log In" onClick={this.renderLogin} />
            <Button label="Sign Up" onClick={this.renderSignup} className="p-button-success" style={{marginLeft: "10px"}}/>
          </div>
        </div>}
        {displaySignUp && <SignUp renderHome={this.renderHome}/>}
        {displayLogin && <Login renderHome={this.renderHome}/>}
      </div>
    );
  }
};
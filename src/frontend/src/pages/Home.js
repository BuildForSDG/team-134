
import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { Button } from 'primereact/button';
import { SignUp } from './SignUp';

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

  login = () => {
    //TODO: implement login
    window.location = '#/dashboard';
  }

  signup = () => {
    this.setState({displayHome: false, displaySignUp: true});
  }

  render(){
    const { displayHome, displayLogin, displaySignUp } = this.state;
    return(
      <div style={{ paddingTop: '5%' }}>
        {displayHome && <div>
          <h1>Introducing PingBin</h1>
          <h2>A Smart Solution To Improve Garbage Collection</h2>
          <p className="a ">We proudly introduce our smart bin service that requests for pick up once it's full.</p>
          <p className="a ">Put the garbage in the bin, we'll take the tin.</p>
          <div className="btn-holder">
            <Button label="Log In" onClick={this.login} />
            <Button label="Sign Up" onClick={this.signup} className="p-button-success" style={{marginLeft: "10px"}}/>
          </div>
        </div>}
        {displaySignUp && <SignUp/>}
        {/* {displayLogin && Login} */}
      </div>
    );
  }
};
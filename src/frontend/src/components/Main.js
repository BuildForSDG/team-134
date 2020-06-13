
import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';

import '../layout/main.css'

export class Main extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className="main-body">
        <div className="topnav">
            <a className="active" href="#/">Home</a>
            <a href="#/about">About Us</a>
            {/* <a href="#signin">Sign In</a> */}
            <a href="#/contact">Contact Us</a>
        </div>
        <Route path='/' exact component={Home}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/about' component={About}/>
        {/* <Route path='/signin' component={SignIn}/> */}
      </div>
    );
  }
}
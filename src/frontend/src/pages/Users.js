import React, { Component } from 'react';
import {UserService} from '../services/users';

export class Users extends Component {
  constructor(){
    super();
    this.state = {};
    this.userService = new UserService();
  }

  componentDidMount(){

  }

  render(){
    return(
      <h1 style={{color: '#000000'}}>Users</h1>
    );
  }
};
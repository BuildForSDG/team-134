
import React, { Component } from 'react';
import {Chart} from 'primereact/chart';
import BinsService from '../services/bins';

export class Bins extends Component {
  constructor(){
    super();
    this.state = {};
    this.binsService = new BinsService();
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <h1 style={{color: '#000000'}}>
        Bins
      </h1>
    );
  }
};
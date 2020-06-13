import React, { Component } from 'react';
import { BinsService } from '../services/bins';

import {ProgressSpinner} from 'primereact/progressspinner';
import {Chart} from 'primereact/chart';
import {Growl} from 'primereact/growl';

export class Overview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            binsList: [], dataLoading: true
        };
        const userId = sessionStorage.getItem('userId');
        const authToken = sessionStorage.getItem('authToken');
        this.binService = new BinsService(authToken, userId);

        let date = new Date();
        let dayOfMonth = date.getDate();
        let totalMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let monthVolume = [];
        let monthLabels = [];
        let min = 1000, max = 1500;
        for (let i = 1; i <= totalMonthDays; i++) {
            let randValue = Math.floor(Math.random() * (max - min + 1)) + min;
            monthVolume.push(randValue);
            monthLabels.push(i.toString());
        }
        let arr;
        if(dayOfMonth > 1){
            arr = monthVolume.slice(0, dayOfMonth-1);
            arr.push(max);
        }else{
            arr = [max];
        }

        this.monthData = {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Overall Volume Trend (cubic cm)',
                    fill: false,
                    backgroundColor: '#9CCC65',
                    borderColor: '#9CCC65',
                    data: arr
                }
            ]
        }
    }

    async componentDidMount() {
        try {
            const response = await this.binService.getAllBins();
            this.setState({binsList: response.data, dataLoading: false});
        } catch (error) {
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
    }

    render() {    
        const {binsList, dataLoading} = this.state;    
        return (
            <div className="p-grid p-fluid dashboard">
                <Growl ref={(el) => this.growl = el} />
                { dataLoading && <ProgressSpinner strokeWidth='1' style={{marginTop:'10%', width: '20%', height:'20%'}}/>}

                { !dataLoading && <>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Bins</span>
                        <span className="detail">Number of smart bins deployed</span>
                        {/* <span className="count visitors">{binsList.length}</span> */}
                        <span className="count visitors">{2}</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Month volume</span>
                        <span className="detail">Current volume of garbage</span>
                        <span className="count purchases">1500cm<sup>3</sup></span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Full Bins</span>
                        <span className="detail">Bins that need emptying</span>
                        <span className="count revenue">0</span>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <Chart type="line" data={this.monthData} height="300" width="800" />
                    </div>
                </div>
                </>}
            </div>
        );
    }
}
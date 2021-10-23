import React, { Component } from 'react';

export class AppFooter extends Component {

    constructor(){
        super();
        this.currentYear = new Date().getFullYear();
    }

    render() {
        return  (
            <div className="layout-footer">
                <img src="assets/layout/images/app-logo.png" alt="Logo" width="40" height="40"/>
                <span className="footer-text" style={{marginLeft: '5px', marginRight: '5px'}}>PingBin</span>
                {/* <img src="assets/layout/images/logo.svg" alt="Logo" width="80"/> */}
                <span className="footer-text" style={{'marginLeft': '5px'}}>{this.currentYear}</span>
            </div>
        );
    }
}
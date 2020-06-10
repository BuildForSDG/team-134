import React, { Component } from 'react';

import '../layout/about.css'

export class About extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className="about-body">
        <h1>About Us & Who We Are</h1>
        <h2>About Us</h2>
        <p className="b">Here at Bin Bin we're passionate about the environment, how garbage is collected and how it is disposed.</p>
        <p className="b">We've created a product that only requires you to responsibly dispose of your garbage bag and we'll handle the rest.</p>
        <p className="b">We've worked diligently to come up with PingBin. A bin that requests for pick up automatically; once it's full.</p>
        <br/>
        <h2> Who We Are</h2>
        <p className="b">We're a group of six passionate developers with varying credentials and qualifications spanning back and front end development.</p>
        <br/>
        <h2>Meet The Team</h2>
        <div className="row" style={{marginTop: '2%'}}>
            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/Makavura.jpg" alt="Makavura" />
                    <div className="container">
                        <h2>Makavura Muhanga</h2>
                        <p className="b">TTL &amp; Frontend Developer</p>
                        <p className="b">Some text that describes me.</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/Allan.jpg" alt="Allan"/>
                    <div className="container">
                        <h2>Allan Mwirigi</h2>
                        <p className="b">Backend Developer</p>
                        <p className="b">Student. Works with Node.js, Android & React</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/EricKioko.jpg" alt="Eric" />
                    <div className="container">
                        <h2>Eric Kioko</h2>
                        <p className="b">Backend Developer</p>
                        <p className="b">Student. Works with React.js, Node.js & Laravel.</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <div className="card">
                    <img src="" alt="Macharia"/>
                    <div className="container">
                        <h2>John Macharia</h2>
                        <p className="b">Frontend Developer</p>
                        <p className="b">Web Applications Developer.</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/IanGeorgeGitau.png" alt="Ian" />
                    <div className="container">
                        <h2>Ian George Gitau</h2>
                        <p className="b">Frontend Developer</p>
                        <p className="b">Student. Works with Javascript, HTML & CSS</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="card">
                    <img src="" alt="Kiptanui" />
                    <div className="container">
                        <h2>Peter Kiptanui</h2>
                        <p className="b">Backend Developer</p>
                        <p className="b">Some text that describes me.</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
};
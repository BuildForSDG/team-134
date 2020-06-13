import React, { Component } from 'react';
import SimpleImageSlider from "react-simple-image-slider";

import '../layout/about.css'

export class About extends Component {
  constructor(){
    super();
    this.state = {};
    this.projectImages =  [
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_105858.jpg?alt=media&token=ad575528-0bcb-4c68-8c1d-9f40608aaa1b'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_105918.jpg?alt=media&token=3244b0b7-d4d5-4564-9cfd-fb3a2ed36042'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_105927.jpg?alt=media&token=84dd2af3-141d-49ce-a2e1-0debafec3c5b'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_110017.jpg?alt=media&token=acca2db2-8cd8-4ef2-b0e2-258735542df5'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_110052.jpg?alt=media&token=808af045-76e3-4e38-b838-c2005369c182'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_110207.jpg?alt=media&token=ab627b13-d406-4db4-91a6-9a95dc216d9d'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_110223.jpg?alt=media&token=d02f7cc7-ea1f-4571-95cf-b23c9bfe04aa'},
        { url: 'https://firebasestorage.googleapis.com/v0/b/cloudtest-5cc2c.appspot.com/o/20200613_110235.jpg?alt=media&token=6697220b-cb79-40f1-be78-0d28c6ec90bc'}
    ]
  }

  componentDidMount(){
    
  }

  itemTemplate = (url) => {
    return (
        <div className="p-grid p-nogutter p-justify-center">
            <img src={`${url}`} alt='Project Pic' />
        </div>
    );
  }

  render(){
    return(
      <div className="about-body">
        <h2>About Us</h2>
        <p className="b">Here at PingBin, we're passionate about the environment, how garbage is collected and how it is disposed.</p>
        <p className="b">We've created a product that only requires you to responsibly dispose of your garbage bag and we'll handle the rest.</p>
        <p className="b">We've worked diligently to come up with PingBin. A bin that requests for pick up automatically; once it's full.</p>
        <p className="b">We've also built an analytics platform where the bins can be monitored remotely</p>
        <br/>
        <h2> The Product</h2>
        <SimpleImageSlider className="image-slider"
            width={936}
            height={590}
            images={this.projectImages} />
        <br/><br/>
        <h2>Meet The Team</h2>
        <p className="b">We're a group of six passionate developers with varying credentials and qualifications spanning back and front end development.</p>
        <div className="row card-container">
            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/Makavura.jpg" alt="Makavura" />
                    <div className="container">
                        <h2>Makavura Muhanga</h2>
                        <p class="b">TTL &amp; Frontend Developer</p>
                        <p class="b">DevOps &amp; Software Engineer. Works at Sibasi Ltd</p>
                        <p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/makavuramughanga/">
                            <button className="button">Profile</button> </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/Allan.png" alt="Allan"/>
                    <div className="container">
                        <h2>Allan Mwirigi</h2>
                        <p className="b">Backend Developer</p>
                        <p className="b">Student. Works with Node.js, Android & React</p>
                        <p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/allan-mwirigi-72897a147/">
                            <button className="button">Profile</button></a>
                        </p>
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
                        <p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eric-kioko-a19746153/">
                            <button className="button">Profile</button></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            
            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/Kiptanui.png" alt="Kiptanui" />
                    <div className="container">
                        <h2>Peter Kiptanui</h2>
                        <p className="b">Backend Developer. Electronics</p>
                        <p class="b">Works with Java, JavaScript, PHP, &amp; Python.</p>
                        <p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/peter-kiptanui-06b070191/">
                            <button className="button">Profile</button></a>
                        </p>
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
                        <p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ian-george-gitau-a584a5190/">
                            <button className="button">Profile</button></a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="assets/layout/images/Macharia.png" alt="Macharia"/>
                    <div className="container">
                        <h2>John Macharia</h2>
                        <p className="b">Frontend Developer</p>
                        <p className="b">Web Applications Developer.</p>
                        <p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/johnmkariuki/">
                            <button className="button">Profile</button></a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    );
  }
};
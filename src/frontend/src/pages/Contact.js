
import React, { Component } from 'react';
import {Growl} from 'primereact/growl';

import '../layout/contact.css';

export class Contact extends Component {
  constructor(){
    super();
    this.state = {
      nameInput: '', subjectInput: ''
    };
  }

  componentDidMount(){
    
  }

  handleNameInput = (e) => {
    this.setState({nameInput: e.target.value})
  }

  handleSubjectInput = (e) => {
    this.setState({subjectInput: e.target.value})
  }

  submit = () => {
    const { nameInput, subjectInput } = this.state;
    if(nameInput.length === 0 || subjectInput.length === 0){
      const msg = 'Please fill in all fields'
      this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: false});     
      return;     
    }
    const msg = 'Feedback submitted';
    this.growl.show({severity: 'success', summary: msg});
    this.setState({nameInput: '', subjectInput: ''});
  }

  render(){
    return(
      <div className="contact-body">
        <Growl ref={(el) => this.growl = el} />
        <h2>Get In Touch</h2>
        <p className="d"> Feel free to reach out if you have any product related questions and enquiries.</p>
        <div className="form-container">
            <form>
              <label htmlFor="fname">Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name.." 
                value={this.state.nameInput} onChange={this.handleNameInput}/>

              <label htmlFor="country">Country</label>
              <select id="country" name="country">
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
                <option value="tanzania">Tanzania</option>
                <option value="other">Rest Of Africa</option>
                <option value="other">International</option>
              </select>

              <label htmlFor="subject">Subject</label>
              <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"150px"}}
                value={this.state.subjectInput} onChange={this.handleSubjectInput}></textarea>

              <input type="button" value="Submit" onClick={this.submit}/>

            </form>
        </div>
      </div>
    );
  }
};
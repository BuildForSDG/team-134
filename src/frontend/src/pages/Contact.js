
import React, { Component } from 'react';

import '../layout/contact.css';

export class Contact extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className="contact-body">
        <h2>Get In Touch</h2>
        <p className="d"> Feel free to reach out if you have any product related questions and enquiries.</p>
        <div className="form-container">
            <form action="action_page.php">

                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                <label htmlFor="country">Country</label>
                <select id="country" name="country">
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
                <option value="tanzania">Tanzania</option>
                <option value="other">Rest Of Africa</option>
              <option value="other">International</option>
              </select>

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"200px"}}></textarea>

                <input type="submit" value="Submit"/>

            </form>
        </div>
      </div>
    );
  }
};

import React, { Component } from 'react';

import '../layout/signin.css';

export class SignUp extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className="signin-body">
        <h2>Interested? Sign Up!</h2>
        <p className="c ">We promise not to spam you or share your email address without your consent.</p>

        <div className="signin-form">
          <form action="action_page.php" style={{ border: "1px solid #ccc"}}>
            <div className="container">
              <p className="c">Please fill in this form to create an account.</p>
              <hr/>

              <label htmlFor="email"><b>Email</b></label>
              <input type="text" placeholder="Enter Email" name="email" required/>

              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required/>

              <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
              <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>

              <p className="c">By creating an account you agree to our <a href="#" style={{color: "#4CAF50"}}>Terms & Privacy</a>.</p>

              <div className="clearfix">
                  <button type="button" className="cancelbtn">Cancel</button>
                  <button type="submit" className="signupbtn">Sign Up</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    )
  }
}
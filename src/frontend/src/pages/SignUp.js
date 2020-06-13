
import React, { Component } from 'react';
import { UserService } from '../services/users';
import {Growl} from 'primereact/growl';
import {ProgressBar} from 'primereact/progressbar';
import '../layout/signin.css';

export class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameInput: '', emailInput: '', passInput: '', confirmPassInput: '',
      displayLoading: false
    };
    this.userService = new UserService();
  }

  componentDidMount(){
    
  }

  handleNameInput = (e) =>{
    this.setState({nameInput: e.target.value});
  }

  handleEmailInput = (e) =>{
    this.setState({emailInput: e.target.value});
  }

  handlePassInput = (e) =>{
    this.setState({passInput: e.target.value});
  }

  handleConfirmPassInput = (e) =>{
    this.setState({confirmPassInput: e.target.value});
  }

  signUp = async () =>{
    const { nameInput, emailInput, passInput, confirmPassInput } = this.state;
    if(nameInput.length === 0 || emailInput.length === 0 || passInput.length === 0 || confirmPassInput.length === 0){
      const msg = 'Please fill in all fields'
      this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: false});     
      return;        
    }
    if(passInput !== confirmPassInput ){
      const msg = 'Passwords do not match'
      this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: false});     
      return;     
    }
    try {
      this.setState({ displayLoading: true});
      const response = await this.userService.signUp(nameInput, emailInput, passInput);
      this.props.renderHome(true);
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          const msg = 'Account not found. Enter correct details or Sign Up';
          this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: true});     
        }
        else if(error.response.status === 500){
          // TODO: set custom error for duplicate user in backend, 500 should capture other errors
          const msg = 'An account matching that name or email exists. Login instead';
          this.growl.show({severity: 'error', summary: 'Error', detail: msg, sticky: true});     
        }
        else{
          this.growl.show({severity: 'error', summary: 'Error', detail: 'Server Error', sticky: true});     
        }
      }else{
        this.growl.show({severity: 'error', summary: 'Error', detail: 'Server Error', sticky: true});    
      }
      this.setState({ displayLoading: false});
    }
  }

  cancel = () =>{
    this.props.renderHome(false);
  }

  render(){
    const { displayLoading } = this.state;
    return(
      <div className="signin-body" style={{paddingBottom: '5%'}}>
        <Growl ref={(el) => this.growl = el} />
        <h2>Interested? Sign Up!</h2>
        <p className="c ">We promise not to spam you or share your email address without your consent.</p>

        <div className="signin-form" >
          <form style={{ border: "1px solid #ccc"}}>
            <div className="container" style={{paddingBottom: '5%'}}>
              <p className="c">Please fill in this form to create an account.</p>
              <hr/>

              <label htmlFor="name"><b>Name</b></label>
              <input type="text" placeholder="Enter Full Name" name="name" required
                onChange={this.handleNameInput} value={this.state.nameInput}/>

              <label htmlFor="email"><b>Email</b></label>
              <input type="text" placeholder="Enter Email" name="email" required
                onChange={this.handleEmailInput} value={this.state.emailInput}/>

              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required
                onChange={this.handlePassInput} value={this.state.passInput}/>

              <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
              <input type="password" placeholder="Repeat Password" name="psw-repeat" required
                onChange={this.handleConfirmPassInput} value={this.state.confirmPassInput}/>

              <p className="c">By creating an account you agree to our <a href="https://www.termsandconditionsgenerator.com/live.php?token=MM5AZTinkjiLixhhvpFFWUMKa06WiQvp" 
                target="_blank" rel="noopener noreferrer" style={{color: "#4CAF50"}}>Terms & Privacy</a>.</p>

              {!displayLoading && <div className="clearfix">
                  <button type="button" className="cancelbtn" onClick={this.cancel}>Cancel</button>
                  <button type="button" className="signupbtn"onClick={this.signUp}>Sign Up</button>
              </div>}
              { displayLoading && <ProgressBar mode="indeterminate" style={{height: '6px'}} /> }
            </div>
          </form>
        </div>

      </div>
    )
  }
}
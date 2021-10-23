
const axios = require('axios');

// make calls to backend here
export class UserService {
  constructor(){
  }

  signUp = (username, email, password) =>{
    const data = { username, email, password };
    return axios.post('/api/v1/users', data);
  }

  login = (email, password) =>{
    const data = { email, password };
    return axios.post('/api/v1/login', data);
  }

  getAllUsers = () =>{

  }

}
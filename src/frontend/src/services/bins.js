
import axios from 'axios';

// make calls to backend here
export class BinsService {
  constructor(authToken, userid){
    this.config = { headers: { authorization: authToken, userid } };
  }

  createBin = (data) => {
    return axios.post('/api/v1/bins/', data, this.config);
  }

  getAllBins = () =>{
    return axios.get('/api/v1/bins/', this.config);
  }

  getBin = (binId) =>{
    return axios.get(`/api/v1/bins/${binId}`, this.config);
  }

  updateBin = (binId, data) =>{
    return axios.put(`/api/v1/bins/${binId}`, data, this.config);
  }

  setBinEmptied = (binId, data) =>{
    return axios.post(`/api/v1/bins/${binId}/emptied`, data, this.config);
  }

  deleteBin = (binId) => {
    return axios.delete(`/api/v1/bins/${binId}`, this.config);
  }

}
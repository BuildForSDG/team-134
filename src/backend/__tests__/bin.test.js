
const axios = require('axios');
require('dotenv').config();

// config defaults for axios
axios.defaults.baseURL = `${process.env.API_URL}/bins`;

const binData = {
  lat: '38.8951',
  lng: '-77.0364',
  max_weight: 4.5,
  min_height: 100,
  current_weight: 12.25,
  current_height: 10,
  bin_code: 'BINA1'
};
let binId; // to store the id that will be received when a bin is created

describe('Bin Tests', () => {
  // each test is wrapped inside a describe block so that they can run sequentially
  // describe blocks are executed synchronously
  describe('Create Bin', () => {
    test('Axios POST bin data', async (done) => {
      try {
        const response = await axios.post('/', binData);
        const statusCode = response.status;
        binId = response.data.binId;
        expect(statusCode).toBe(201);
        expect(binId).not.toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Get All Bins', () => {
    test('Axios GET', async (done) => {
      try {
        const response = await axios.get('/');
        expect(response.status).toBe(200);
        expect(response.data).not.toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Get Bin By Id', () => {
    test('Axios GET with ID', async (done) => {
      try {
        const response = await axios.get(`/${binId}`);
        expect(response.status).toBe(200);
        expect(response.data).not.toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Update Bin', () => {
    test('Axios PUT', async (done) => {
      try {
        const data = {
          current_height: 20,
          current_weight: 30
        };
        const response = await axios.put(`/${binId}`, data);
        expect(response.status).toBe(201);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

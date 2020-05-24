
const axios = require('axios');
const logger = require('../utils/winston');

require('dotenv').config();

jest.setTimeout(1000 * 7);

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
  describe('Create Bin', () => {
    let statusCode;
    beforeAll(async (done) => {
      try {
        const response = await axios.post('/', binData);
        statusCode = response.status;
        binId = response.data.binId;
        done();
      } catch (error) {
        logger.debug(`jest | statusCode ${error.response.status}`, [error.response.data]);
        done(error);
      }
    });
    test('POST bin data', () => {
      expect(statusCode).toBe(201);
      expect(binId).not.toBeNull();
    });
  });
});

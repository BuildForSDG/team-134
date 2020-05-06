
const router = require('express').Router();
const { testEndpoint } = require('../controllers/bin');

// TODO: remove this, is just a test of the setup
router.get('/test', testEndpoint);

module.exports = router;

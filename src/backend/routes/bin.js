
const router = require('express').Router();
const { createBin } = require('../controllers/bin');

// create bin
router.post('/', createBin);

module.exports = router;

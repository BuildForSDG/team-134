
const router = require('express').Router();
const { createBin, getAllBins } = require('../controllers/bin');

// create bin
router.post('/', createBin);

// get all bins
router.get('/', getAllBins);

module.exports = router;

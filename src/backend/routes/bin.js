
const router = require('express').Router();
const { createBin, getAllBins, getBin } = require('../controllers/bin');

// create bin
router.post('/', createBin);

// get all bins
router.get('/', getAllBins);

// get specific bin
router.get('/:id', getBin);

module.exports = router;

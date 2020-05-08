
const router = require('express').Router();
const userRoutes = require('../controllers/user');

router.post('/', userRoutes.signup); // user signup route & logic

module.exports = router;


const router = require('express').Router();
const userRoutes = require('../controllers/user');

router.post('/', userRoutes.signup); // user signup route & logic
router.post('/login', userRoutes.login); // user login route & logic
router.put('/:id', userRoutes.updateUser); // user update route & logic

module.exports = router;

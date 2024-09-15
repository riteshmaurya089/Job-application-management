const express = require('express');
const { signup, login } = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

// User signup
router.post('/signup', signupValidator, signup);

// User login
router.post('/login', loginValidator, login);

module.exports = router;

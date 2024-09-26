const express = require('express');
const { registerUser, verifyOTP, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyOTP);
router.post('/login', loginUser);

module.exports = router;

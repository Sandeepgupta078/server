const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Register User and send OTP
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });

    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex');
    user.otp = otp;

    await user.save();

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
    });

    const mailOptions = {
      to: user.email,
      subject: 'Verify your account',
      text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered. OTP sent to email.' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (user && user.otp === otp) {
    user.isVerified = true;
    user.otp = undefined; // Remove OTP once verified
    await user.save();
    return res.json({ message: 'User verified' });
  }
  res.status(400).json({ error: 'Invalid OTP' });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Please verify your email' });
    }
    res.json({ message: 'Login successful' });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
};

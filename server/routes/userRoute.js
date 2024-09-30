const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModal.js'); // Import User model
const router = express.Router();
require('dotenv').config(); // Load environment variables from .env file

// Load the JWT secret key from the environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = require('../middlewares/authMiddleware');

// POST: Signup Route
router.post('/signup', async (req, res) => {
  const { name,email, password,phone } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user and save to the database
    const newUser = new User({ name,email, password,phone });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// POST: Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' +err });
  }
});


router.get('/home', authMiddleware, (req, res) => {
    res.status(200).json({
      message: 'Welcome to the home page!',
      user: req.user,
    });
  });

module.exports = router;

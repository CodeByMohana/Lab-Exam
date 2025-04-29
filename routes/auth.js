const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Register
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, phoneNumber, age, monthlyIncome } = req.body;
    const user = new User({ username, phoneNumber, age, monthlyIncome });
    await User.register(user, password);
    res.redirect('/login');
  } catch (e) {
    console.log(e);
    res.redirect('/register');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/subscriptions',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;
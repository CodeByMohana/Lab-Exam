const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { isLoggedIn } = require('../middleware'); // make an auth middleware

// NEW
router.get('/subscriptions/new', isLoggedIn, (req, res) => {
  res.render('subscriptions/new');
});

// CREATE
router.post('/subscriptions', isLoggedIn, async (req, res) => {
  const subscription = new Subscription(req.body.subscription);
  subscription.user = req.user._id;
  await subscription.save();
  res.redirect('/subscriptions');
});

// READ (Index)
router.get('/subscriptions', isLoggedIn, async (req, res) => {
  const subscriptions = await Subscription.find({ user: req.user._id });
  res.render('subscriptions/index', { subscriptions });
});

// SHOW
router.get('/subscriptions/:id', isLoggedIn, async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  res.render('subscriptions/show', { subscription });
});

// EDIT
router.get('/subscriptions/:id/edit', isLoggedIn, async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  res.render('subscriptions/edit', { subscription });
});

// UPDATE
router.post('/subscriptions/:id', isLoggedIn, async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);

  // Only allow updating everything except plan
  const { cost, startDate, endDate } = req.body.subscription;
  subscription.cost = cost;
  subscription.startDate = startDate;
  subscription.endDate = endDate;

  await subscription.save();
  res.redirect(`/subscriptions/${req.params.id}`);
});

// DELETE
router.get('/subscriptions/:id/delete', isLoggedIn, async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.redirect('/subscriptions');
});

module.exports = router;
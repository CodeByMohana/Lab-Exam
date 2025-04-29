const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const User = require('./models/User');

const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscriptions');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/subscriptionApp');


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(session({ secret: 'notagoodsecret', resave: false, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });
// Set EJS
app.set('view engine', 'ejs');

// Routes
app.use(authRoutes);
app.use(subscriptionRoutes);



app.listen(3000, () => {
  console.log('Serving on port 3000');
});
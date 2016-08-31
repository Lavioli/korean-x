const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const secret = require('../google-secret');
const Question = require('../models/question');
const User = require('../models/user');

const router = express.Router();

// GOOGLE AUTHENTICATION STRATEGY
passport.use(new GoogleStrategy({
  clientID: secret.GOOGLE_CLIENT_ID,
  clientSecret: secret.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback',
},
  (accessToken, refreshToken, profile, cb) => {
    User.find({ googleId: profile.id }, (err, user) => {
      if (!user.length) {
        const questArr = [];
        Question.find((err, questions) => {
          questions.forEach((question) => {
            questArr.push({
              questionId: question._id,
              mValue: 1,
            });
          });

          User.create({
            googleId: profile.id,
            name: profile.displayName,
            score: 0,
            questions: questArr,
          }, (err, user) => {
            return cb(err, user);
          });
        });
      }

      return cb(err, user);
    });
  }
));

// PASSPORT SERIALIZING to authenticate for sessions
passport.serializeUser((user, done) => {
  done(null, user[0]._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});

// Authentication GET requests
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/#/main');
  }
);

module.exports = router;

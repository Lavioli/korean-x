const fs = require('fs');

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

// const secret = require('../google-secret');
const Question = require('../models/question');
const User = require('../models/user');

const router = express.Router();

// GOOGLE AUTHENTICATION STRATEGY
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://young-anchorage-88242.herokuapp.com/auth/google/callback',
},
  (accessToken, refreshToken, profile, cb) => {
    User.find({ googleId: profile.id }, (err, user) => {
      if (!user.length) {
        const questArr = [];
        Question.find((err, questions) => {
          questions.forEach((question) => {
            questArr.push({
              questionId: question._id,
              question: question.question,
              answer: question.answer,
              mValue: 1,
            });
          });

          User.create({
            accessToken,
            googleId: profile.id,
            name: profile.displayName,
            score: 0,
            questions: questArr,
          }, (err, user) => {
            return cb(err, user);
          });
        });
      }

      return cb(err, user[0]);
    });
  }
));

passport.use(new BearerStrategy(
  (token, done) => {
    User.find({ accessToken: token }, (err, user) => {
      if (err) {
        return done(null, false);
      }

      if (!user.length) {
        return done(null, false);
      }

      return done(null, user[0]);
    });
  }
));

// Authentication GET requests
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Successful authentication, redirect home.
    fs.readFile('./frontend/build/index.html', (err, html) => {
      html = html.toString();
      html = html.replace('<!--script-->',
        `<script>const AUTH_TOKEN="${req.user.accessToken}";
        history.replaceState(null, null, "/#/main");</script>`);
      res.send(html);
    });
  }
);

module.exports = router;

const fs = require('fs');

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const secret = require('../google-secret');
const Question = require('../models/question');
const User = require('../models/user');

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || secret.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || secret.GOOGLE_CLIENT_SECRET;

// GOOGLE AUTHENTICATION STRATEGY
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://young-anchorage-88242.herokuapp.com/auth/google/callback',
  // callbackURL: 'http://localhost:8080/auth/google/callback',
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

          // FIXME: When you create a new user, it redirects to /login instead
          // of taking you to the /#/main
          User.create({
            accessToken,
            googleId: profile.id,
            name: profile.displayName,
            score: 0,
            questions: questArr,
          }, (err, user) => {
            console.log(user);
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
  passport.authenticate('google', { failureRedirect: '/', session: false }),
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

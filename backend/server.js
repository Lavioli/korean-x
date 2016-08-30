const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const secret = require('./google-secret');
const Question = require('./models/question');
const User = require('./models/user');

const app = express();
const jsonParser = bodyParser.json();

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());


// RUN SERVER FUNCTION
function runServer(callback) {
  mongoose.connect(config.DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, () => {
      console.log(`Listening on localhost: ${config.PORT}`);
      if (callback) {
        callback();
      }
    });
  });
}

if (require.main === module) {
  runServer((err) => {
    if (err) {
      throw new Error(err);
    }
  });
}

// GOOGLE AUTHENTICATION STRATEGY
passport.use(new GoogleStrategy({
  clientID: secret.GOOGLE_CLIENT_ID,
  clientSecret: secret.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback',
},
  (accessToken, refreshToken, profile, cb) => {
    User.find({ googleId: profile.id }, (err, user) => {
      if (!user.length) {
        User.create({
          googleId: profile.id,
          name: profile.displayName,
        }, (err, user) => {
          return cb(err, user);
        });
      }
      return cb(err, user);
    });
  }
));

// PASSPORT SERIALIZING to authenticate for sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Authentication GET requests
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/main');
  }
);

// users GET requests
app.get('/users', (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(users);
  });
});

app.get('/questions', (req, res) => {
  Question.find((err, questions) => {
    if (err) {
      return res.status(400).json(err);
    }
  // get the user object through ..
  // get the questions through the ids in the array
  // create some resp object which holds all these and
  // return this as the response
    return res.status(200).json(questions);
  });
});

app.post('/questions', jsonParser, (req, res) => {
  if (!req.body.question) {
    return res.status(422).json({
      message: 'Missing field: Question',
    });
  }

  if (!req.body.answer) {
    return res.status(422).json({
      answer: 'Missing field: Answer',
    });
  }

  Question.create({
    question: req.body.question,
    answer: req.body.answer,
  }, (err, question) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.header('location', `/questions/${question._id}`)
      .status(201)
      .json(question);
  });
});

exports.app = app;
exports.runServer = runServer;

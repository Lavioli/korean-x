const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const secret = require('./google-secret');
const Question = require('./models/question');
const User = require('./models/user');

const app = express();
const jsonParser = bodyParser.json();

// PASSPORT MIDDLEWARE
app.use(cookieParser());
app.use(session({ secret: 'monkeys' }));
app.use(passport.initialize());
app.use(passport.session());

function loggedIn(req, res, next) {
  console.log(req.user);
  if (req.user) {
    console.log('YAYYYYYYY');
    next();
  } else {
    res.redirect('/');
  }
}

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

// QUESTIONS endpoint
// will pull the first question of the question array
// based on the user that is logged in
app.get('/questions', loggedIn, (req, res) => {
  // TEMP USER
  const userId = '57c5ce92b875aac15ccdd822';

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    Question.findById(user.questions[0].questionId, (err, question) => {
      if (err) {
        return res.status(400).json(err);
      }

      const resQuestion = {
        _id: question._id,
        question: question.question,
        mValue: user.questions[0].mValue,
        score: user.score,
      };

      return res.status(200).json(resQuestion);
    });
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

/*
QUESTIONS put request
should be what happens when a user submits something
will check for the correct answer and respond with the
next question. Takes object in the following format:
{
  _id: '57c4a91d97cf256242b0ad13',
  answer: 'rice' // whatever the user input is
}
*/
app.put('/questions', jsonParser, (req, res) => {
  if (!req.body._id) {
    return res.status(422).json({
      message: 'Missing field: _id',
    });
  }

  if (!req.body.answer) {
    return res.status(422).json({
      message: 'Missing field: answer',
    });
  }
  // TEMP USER
  const userId = '57c5ce92b875aac15ccdd822';

  User.findById(userId, (err, user) => {
    const userQuest = user.questions.slice();
    let userScore = user.score;
    let result = false;

    Question.findById(req.body._id, (err, question) => {
      if (err) {
        return res.status(400).json(err);
      }

      if (question.answer === req.body.answer) {
        userQuest[0].mValue *= 2;
        userScore += 10;
        result = true;
      }

      const currentQuest = userQuest.shift();
      userQuest.push(currentQuest);

      User.findByIdAndUpdate(userId, {
        score: userScore,
        questions: userQuest,
      }, (err, newUser) => {
        if (err) {
          return res.status(400).json(err);
        }

        Question.findById(user.questions[0].questionId, (err, newQuestion) => {
          const resQuestion = {
            result,
            _id: newQuestion._id,
            question: newQuestion.question,
            mValue: user.questions[0].mValue,
            score: userScore,
          };

          return res.status(200).json(resQuestion);
        });
      });
    });
  });
});

exports.app = app;
exports.runServer = runServer;

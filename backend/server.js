const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const config = require('./config');
const Question = require('./models/question');
const User = require('./models/user');
const auth = require('./routes/auth');
const questions = require('./routes/questions');
const app = express();
const jsonParser = bodyParser.json();

app.use(cookieParser());
app.use(session({ secret: 'monkeys' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('../frontend/build'));

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

app.use('/auth', auth);
app.use('/questions', questions);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// users GET requests
app.get('/users', (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(users);
  });
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(user);
  });
});


exports.app = app;
exports.runServer = runServer;

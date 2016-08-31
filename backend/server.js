const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const config = require('./config');
const auth = require('./routes/auth');
const questions = require('./routes/questions');
const users = require('./routes/users');

const app = express();

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

app.use(cookieParser());
app.use(session({ secret: 'monkeys' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('../frontend/build'));

app.use('/auth', auth);
app.use('/questions', questions);
app.use('/users', users);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

exports.app = app;
exports.runServer = runServer;

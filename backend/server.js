const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('./config');
const auth = require('./routes/auth');
const questions = require('./routes/questions');
const users = require('./routes/users');

const app = express();
const jsonParser = bodyParser.json();

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

app.use(passport.initialize());
app.use(express.static('../frontend/build'));
app.use(jsonParser);

app.use('/auth', auth);
app.use('/questions', questions);
app.use('/users', users);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

exports.app = app;
exports.runServer = runServer;

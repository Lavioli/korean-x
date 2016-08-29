const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const Question = require('./models/question');
const User = require('./models/user');
const MValue = require('./models/mvalue');

const app = express();

const jsonParser = bodyParser.json();

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

app.get('/questions', (req, res) => {
  Question.find((err, questions) => {
    if (err) {
      return res.status(400).json(err);
    }

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

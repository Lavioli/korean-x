const express = require('express');
const bodyParser = require('body-parser');
const Question = require('../models/question');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();
const jsonParser = bodyParser.json();

function makeResponse(_id, question, score, result) {
  return {
    _id,
    question,
    score,
    result,
  };
}

// QUESTIONS endpoint
// will pull the first question of the question array
// based on the user that is logged in
router.get('/', passport.authenticate('bearer', { session: false }), (req, res) => {
  const currentQ = req.user.questions[0];

  const resQuestion = makeResponse(
    currentQ.questionId,
    currentQ.question,
    req.user.score,
    -1
  );

  return res.status(200).json(resQuestion);
});

router.post('/', jsonParser, (req, res) => {
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

    User.find((err, users) => {
      users.forEach((user) => {
        const questArr = user.questions.slice();
        questArr.push({
          mValue: 1,
          questionId: question._id,
          question: question.question,
          answer: question.answer,
        });

        User.findByIdAndUpdate(
          user._id,
          { questions: questArr },
          { new: true },
          err => {
            if (err) {
              return res.status(400).json(err);
            }
          }
        );
      });
    });

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
router.put('/', passport.authenticate('bearer', { session: false }), (req, res) => {
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

  const user = req.user;

  // const userQuest = user.questions.slice();
  // let userScore = user.score;
  let result = false;

  // let currentQ = userQuest[0];
  let currentQ = user.questions[0];
  const currentA = req.body.answer.toLowerCase().trim();

  if (currentQ.answer === currentA) {
    currentQ.mValue *= 2;
    // userScore += 10;
    user.score += 10;
    result = true;
  } else {
    currentQ.mValue = 1;
    if (user.score >= 15) {
      user.score -= 15;
    } else {
      user.score = 0;
    }
  }

  user.questions.shift();
  user.questions.splice(currentQ.mValue, 0, currentQ);
  currentQ = user.questions[0];

  User.findByIdAndUpdate(user._id, {
    score: user.score,
    questions: user.questions,
  }, { new: true }, (err, newUser) => {
    if (err) {
      return res.status(400).json(err);
    }

    const resQuestion = makeResponse(
      currentQ.questionId,
      currentQ.question,
      newUser.score,
      result
    );

    return res.status(200).json(resQuestion);
  });
});

module.exports = router;

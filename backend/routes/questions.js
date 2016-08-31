const express = require('express');
const bodyParser = require('body-parser');
const Question = require('../models/question');
const User = require('../models/user');

const router = express.Router();
const jsonParser = bodyParser.json();

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('ELSE');
    res.redirect('/');
  }
}

// QUESTIONS endpoint
// will pull the first question of the question array
// based on the user that is logged in
router.get('/', /*loggedIn,*/ (req, res) => {
  // TEMP USER
  // const userId = req.user._id;
  // console.log(userId);
  const userId = '57c70400ed63bc78ed60634a'; // SEAN
  // const userId = '57c7365779e5566c21c3176a'; // ROBBY

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
router.put('/', jsonParser, (req, res) => {
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
  // const userId = req.user._id;
  const userId = '57c70400ed63bc78ed60634a'; // SEAN
  // const userId = '57c7365779e5566c21c3176a'; // ROBBY

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
      }, { new: true }, (err, newUser) => {
        if (err) {
          return res.status(400).json(err);
        }

        Question.findById(newUser.questions[0].questionId, (err, newQuestion) => {
          const resQuestion = {
            result,
            _id: newQuestion._id,
            question: newQuestion.question,
            score: newUser.score,
          };

          return res.status(200).json(resQuestion);
        });
      });
    });
  });
});

// TEST endpoint to see the questions array
router.get('/list', loggedIn, (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(user.questions);
  });
});

module.exports = router;

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  mValue: {
    type: Number,
    ref: 'mValue',
  },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;

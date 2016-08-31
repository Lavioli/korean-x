const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const MValueSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },

  question: {
    type: ObjectId,
    ref: 'Question',
  },

  mValue: {
    type: Number,
    required: true,
  },
});

const mValue = mongoose.model('mValue', MValueSchema);

module.exports = mValue;

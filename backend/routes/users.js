const express = require('express');
const User = require('../models/user');

const router = express.Router();

// users GET requests
router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(users);
  });
});

router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(user);
  });
});

module.exports = router;

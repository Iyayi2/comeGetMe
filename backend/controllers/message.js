const mongoose = require('mongoose');
const Message = require('../models/message');

exports.postMessage = (req, res, next) => {
  const { text, conversationId } = req.body;
  const userId = req.session.user?._id;

  const errors = {};
  if (!text.trim())    errors.text           = 'Message empty';
  if (!conversationId) errors.conversationId = 'Cannot find conversation';
  if (!userId)         errors.userId         = 'No user logged in';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ...errors });
  }

  const newMessage = new Message({ text, userId, conversationId });

  newMessage.save()
    .then(message => {
      res.status(201).json(message);
    })
    .catch(err => {
      res.status(500).json({ ...err, message: 'message sending failed' });
    });
};

exports.getMessages = (req, res, next) => {
  Message.find({conversationId: req.params.conversationId})
  .then(messages => {
    res.status(200).json(messages);
  })
  .catch(err => {
    res.status(500).json({ ...err, message: 'failed to fetch messages' });
  })
};

const mongoose = require('mongoose');
const Message = require('../models/message');

exports.postMessage = (req, res, next) => {
  const { text, conversationId } = req.body;
  const userId = req.session.user?._id;

  const missingFields = {};
  if (!text.trim()) missingFields.text = 'Message empty';
  if (!conversationId) missingFields.conversationId = 'Conversation ID missing';
  if (!userId) missingFields.userId = 'Denied. No user logged in';

  if (Object.keys(missingFields).length > 0) {
    return res.status(400).json({ errors: missingFields });
  }

  const newMessage = new Message({ text, userId, conversationId });

  newMessage.save()
    .then(message => {
      res.status(201).json(message);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.getMessages = (req, res, next) => {
  Message.find({conversationId: req.params.conversationId})
  .then(messages => {
    res.status(200).json(messages);
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

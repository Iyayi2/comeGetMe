const mongoose = require('mongoose');
const Message = require('../models/message');

exports.getMessage = (req, res, next) => {
  res.render('message/chat', {
    pageTitle: 'Message',
    path: '/message'
  });
};

exports.postMessage = (req, res, next) => {
  const newMessage = new Message(req.body);

  newMessage.save()
  .then(newMessage => {
    res.status(200).json(newMessage);
  })
  .catch(err =>{
    res.status(500).json(err);
  })
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

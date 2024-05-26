const mongoose = require('mongoose');

const Message = require('../models/message');

const io = require('socket.io');

const socket = io();

exports.getMessage = (req, res, next) => {
  Message.find({})
  .then(messages => {
    res.render('message/chat', {
      pageTitle: 'Messages',
      path: '/message',
      message: messages
    })
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postMessage = (req, res, next) => {
  const content = req.body.content;
  const message = new Message({
    content: content,
    userId: req.user
  });
  message.save()
  .then(message =>{
    res.status(200).json(message);
    socket.emit(message, req.body);
    // console.log('saved' + ' ' + message.content + ' ' + message.userId);
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

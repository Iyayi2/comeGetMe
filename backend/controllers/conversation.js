const Conversation = require('../models/conversation');

exports.postConversation = (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  });

  newConversation.save()
  .then(newConversation => {
    res.status(200).json(newConversation);
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

exports.getConversation = (req, res, next) => {
  Conversation.find({members: { $in: [req.params.userId] }})
  .then(conversation => {
    res.status(200).json(conversation);
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

exports.getConversations = (req, res, next) => {
  Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] }
  })
  .then(conversations => {
    res.status(200).json(conversations);
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

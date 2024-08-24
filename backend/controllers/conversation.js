const Conversation = require('../models/conversation');
const { userDetails } = require('../util/userDetails');

exports.postConversation = (req, res, next) => {
  const user = userDetails(req.session.user);
  const newConversation = new Conversation({
    members: [user, req.body.seller]
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
  const user = userDetails(req.session.user);
  Conversation.find({members: { $in: [user] }})
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

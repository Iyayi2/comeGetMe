const mongoose = require('mongoose');
const Conversation = require('../models/conversation');
const { userDetails } = require('../util/userDetails');

exports.postConversation = (req, res, next) => {
  const user = userDetails(req.session.user);
  const seller = {
    ...req.body.seller,
    _id: new mongoose.Types.ObjectId(String(req.body.seller._id)), // Convert to ObjectId
  }; // seller.product._id is non ObjectId, convert later if needed
  const newConversation = new Conversation({
    members: [user, seller],
  });

  newConversation
    .save()
    .then((newConversation) => {
      res.status(200).json(newConversation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getConversation = (req, res, next) => {

  if (!req.session || !req.session.user) {
    return res.status(403).json({ error: 'Unauthorized access' }); // Return 403 status with an error message
  }

  const { _id } = req.session.user;

  Conversation.find({
    members: { $elemMatch: { _id } },
  })
    .then((conversations) => {
      const conversationsWithSessionId = conversations.map((convo) => ({ ...convo._doc, sessionId: _id }));
      res.status(200).json(conversationsWithSessionId);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getConversations = (req, res, next) => {
  Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  })
    .then((conversations) => {
      res.status(200).json(conversations);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

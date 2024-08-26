const mongoose = require('mongoose');
const Conversation = require('../models/conversation');
const { userDetails } = require('../util/userDetails');

const toObjectId = (id) => new mongoose.Types.ObjectId(String(id));

exports.postConversation = (req, res, next) => {
  const user = userDetails(req.session.user);
  const seller = {
    ...req.body.seller,
    _id: toObjectId(req.body.seller._id), // Convert to ObjectId
    product: {
      ...req.body.seller.product,
      _id: toObjectId(req.body.seller.product._id),
    },
  };
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

exports.getConversations = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(403).json({ error: 'Unauthorized access' }); // Return 403 status with an error message
  }

  const { _id } = req.session.user;

  Conversation.find({
    members: { $elemMatch: { _id } },
  })
    .sort({ createdAt: -1 })
    .then((conversations) => {
      const conversationsWithSessionId = conversations.map((convo) => ({
        ...convo._doc,
        sessionId: _id,
      }));
      res.status(200).json(conversationsWithSessionId);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.findConversation = (req, res, next) => {
  const userId = req.session.user._id;
  const { sellerId, productId } = req.params;

  Conversation.findOne({
    members: {
      $all: [
        { $elemMatch: { _id: userId } },
        { $elemMatch: { _id: toObjectId(sellerId), 'product._id': toObjectId(productId) } },
      ],
    },
  })
    .then((conversation) => {
      if (conversation) {
        res.status(200).json(conversation);
      } else {
        res.status(404).json({ message: 'Conversation not found' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

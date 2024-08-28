const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId, required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, required: true
    },
    text: {
      type: String, required: true,
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);

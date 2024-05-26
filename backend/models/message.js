const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Message', messageSchema);

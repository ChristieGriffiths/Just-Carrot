const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: String, required: true },
  completeDate: { type: Date, required: true },  // changed from String to Date
  completeTime: { type: String, required: true }, // consider combining with completeDate into a single DateTime field
  incentiveAmount: { type: Number, required: true }, // changed from String to Number
  chosenCharity: { type: String, required: true },
  chosenValidation: { type: String, required: true },
  completed: { type: Boolean, required: false, default: null }, 
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: String, required: true },
  completeDate: { type: Date, required: true },  
  completeTime: { type: String, required: true }, 
  incentiveAmount: { type: Number, required: true }, 
  chosenCharity: { type: String, required: true },
  chosenValidation: { type: String, required: true },
  completed: { type: Boolean, required: false, default: null },
  paymentIntentId: { type: String, required: false, default: "default" },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

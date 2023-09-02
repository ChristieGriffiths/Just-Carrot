const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true},
  challenge: { type: String, required: true },
  completeDate: { type: String, required: true },
  completeTime: { type: String, required: true },
  incentiveAmount: { type: String, required: true },
  chosenCharity: { type: String, required: true },
  chosenValidation: { type: String, required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

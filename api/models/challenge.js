const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: String, required: true },
  completeDate: { type: Date, required: true },  
  completeTime: { type: String, required: true }, 
  incentiveAmount: { type: Number, required: true }, 
  chosenCharity: { type: String, required: true },
  chosenValidation: { type: String, required: true },
  completed: { type: Boolean, required: false, default: null },
  emailReminder: { type: Boolean, required: false, default: false},
  paymentIntentId: { type: String, required: false, default: "default" },
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;

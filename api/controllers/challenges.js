const Challenge = require("../models/challenge");
const TokenGenerator = require("../models/token_generator");
const User = require('../models/user');
const { sendEmail } = require('./email');
const mongoose = require('mongoose');
const challengeLocks = {};



const ChallengesController = {
  Index: async (req, res) => {
    try {
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      const challenges = await Challenge.find();
      res.status(200).json({ challenges: challenges, token: token });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  GetEmailByChallengeId: async (req) => {
    try {
      const challenge = await Challenge.findById(req.params.id);
      if (!challenge) {
        return null;
      }
      
      const user = await User.findById(challenge.userId);
      if (!user) {
        return null;
      }
      
      return user.email;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  Create: (req, res) => {
    const challenge = new Challenge(req.body);
    challenge.save(async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Update: async (req, res) => {
    try {
      const id = req.params.id;
      const update = { completed: req.body.completed };

      const updatedChallenge = await Challenge.findByIdAndUpdate(id, update, { new: true });

      if (!updatedChallenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ challenge: updatedChallenge, token: token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  CheckForReminderEmails: async () => {
    try {
      const challenges = await Challenge.find({ completed: null, emailReminder: false });
      for (const challenge of challenges) {
        const datePart = challenge.completeDate.toISOString().split('T')[0];
        const completeDateTime = new Date(`${datePart}T${challenge.completeTime}:00`);
        const currentDateTime = new Date();
        if (currentDateTime > completeDateTime) {
          const email = await ChallengesController.GetEmailByChallengeId({ params: { id: challenge._id } });
          if (email) {
            await sendEmail({
              body: {
                to: email,
                subject: 'Completion Time Elapsed',
                text: "Hey there, you have 24 hours to confirm or deny the completion of your challenge otherwise your money will automatically be donated to charity"
              }
            });
            await Challenge.findByIdAndUpdate(challenge._id, { emailReminder: true }, { new: true });
          }
        }
      }
    } catch (err) {
      console.error("Error in CheckForReminderEmails:", err);
    }
  },

  CheckForExpiredChallenges: async () => {
    try {
      const challenges = await Challenge.find({ completed: null, emailReminder: true });
      for (const challenge of challenges) {
        const datePart = challenge.completeDate.toISOString().split('T')[0];
        const completeDateTime = new Date(`${datePart}T${challenge.completeTime}:00`);
        const currentDateTime = new Date();
        const timeDifference = (currentDateTime - completeDateTime) / (1000 * 60 * 60);
        if (timeDifference > 24) {
          const email = await ChallengesController.GetEmailByChallengeId({ params: { id: challenge._id } });
          if (email) {
            await sendEmail({
              body: {
                to: email,
                subject: 'Challenge Unconfirmed',
                text: "You have not confirmed or denied the completion of your challenge, and your incentive has been donated to your chosen charity."
              }
            });
            await Challenge.findByIdAndUpdate(challenge._id, { completed: false }, { new: true });
          }
        }
      }
    } catch (err) {
      console.error("Error in CheckForExpiredChallenges:", err);
    }
  },

  RunScheduledChecks: async () => {
    await ChallengesController.CheckForReminderEmails();
    await ChallengesController.CheckForExpiredChallenges();
  }
};
  
setInterval(ChallengesController.RunScheduledChecks, 1000 * 60);

module.exports = ChallengesController;
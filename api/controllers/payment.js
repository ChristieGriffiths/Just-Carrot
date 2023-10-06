const Challenge = require('../models/challenge');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const baseURL = "http://localhost:4000";

exports.processPayment = async (req, res) => {
  let { amount, id, challengeId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Just Carrot",
      payment_method: id,
      confirm: true,
      return_url: `${baseURL}/challenges`
    });
    const challenge = await Challenge.findById(challengeId);
    if (challenge) {
      challenge.paymentIntentId = payment.id;
      await challenge.save();
    }
    res.json({
      message: "Payment successful",
      success: true,
      paymentIntentId: payment.id 
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false
    });
  }
};

exports.processRefund = async (req, res) => {
  let { paymentIntentId } = req.body;
  try {
    const challenge = await Challenge.findOne({ paymentIntentId: paymentIntentId });
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });
    res.json({
      message: "Refund successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Refund failed",
      success: false,
    });
  }
};

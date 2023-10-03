const Post = require('../models/post');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const baseURL = "http://localhost:4000";

exports.processPayment = async (req, res) => {
  let { amount, id, postId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Just Carrot",
      payment_method: id,
      confirm: true,
      return_url: `${baseURL}/posts`
    });
    const post = await Post.findById(postId);
    if (post) {
      post.paymentIntentId = payment.id;
      await post.save();
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
    const post = await Post.findOne({ paymentIntentId: paymentIntentId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
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

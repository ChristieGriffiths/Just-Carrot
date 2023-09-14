require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const Post = require('./models/post');

app.post("/payment", cors(), async (req, res) => {
  let { amount, id, postId } = req.body;  // postId is now included
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Just Carrot",
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never"
      }
    });

    const post = await Post.findById(postId);
    if (post) {
      post.paymentIntentId = payment.id;
      await post.save();
    }

    console.log("Payment", payment);
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
});


app.post("/refund", cors(), async (req, res) => {
  let { paymentIntentId } = req.body;  // Retrieve paymentIntentId instead of postId
  console.log(`Payment Intent ID from client: ${paymentIntentId}`); // Debug log

  try {
    const post = await Post.findOne({ paymentIntentId: paymentIntentId });  // Find by paymentIntentId
    if (!post) {
      console.log(`Post with Payment Intent ID ${paymentIntentId} not found`); // Debug log
      return res.status(404).json({ message: "Post not found" });
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    console.log("Refund", refund);
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
});


const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");
  if (authHeader) {
    token = authHeader.slice(7);
  }
  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// Route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
app.use('/email', emailRoutes);

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: 'server error' });
});

// Server listening
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});

module.exports = app;

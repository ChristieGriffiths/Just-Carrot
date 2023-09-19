const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const User = require('../models/user');
const { sendEmail } = require('./emailController');
const mongoose = require('mongoose');
const postLocks = {};



const PostsController = {
  Index: async (req, res) => {
    try {
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      const posts = await Post.find();
      res.status(200).json({ posts: posts, token: token });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  GetEmailByPostId: async (req) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return null;
      }
      
      const user = await User.findById(post.userId);
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
    const post = new Post(req.body);
    post.save(async (err) => {
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

      const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true });

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ post: updatedPost, token: token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  CheckForReminderEmails: async () => {
    try {
      const posts = await Post.find({ completed: null, emailReminder: false });
      for (const post of posts) {
        const datePart = post.completeDate.toISOString().split('T')[0];
        const completeDateTime = new Date(`${datePart}T${post.completeTime}:00`);
        const currentDateTime = new Date();
        if (currentDateTime > completeDateTime) {
          const email = await PostsController.GetEmailByPostId({ params: { id: post._id } });
          if (email) {
            await sendEmail({
              body: {
                to: email,
                subject: 'Completion Time Elapsed',
                text: "Hey there, you have 24 hours to confirm or deny the completion of your challenge otherwise your money will automatically be donated to charity"
              }
            });
            await Post.findByIdAndUpdate(post._id, { emailReminder: true }, { new: true });
          }
        }
      }
    } catch (err) {
      console.error("Error in CheckForReminderEmails:", err);
    }
  },

  CheckForExpiredPosts: async () => {
    try {
      const posts = await Post.find({ completed: null, emailReminder: true });
      for (const post of posts) {
        const datePart = post.completeDate.toISOString().split('T')[0];
        const completeDateTime = new Date(`${datePart}T${post.completeTime}:00`);
        const currentDateTime = new Date();
        const timeDifference = (currentDateTime - completeDateTime) / (1000 * 60 * 60);
        if (timeDifference > 24) {
          const email = await PostsController.GetEmailByPostId({ params: { id: post._id } });
          if (email) {
            await sendEmail({
              body: {
                to: email,
                subject: 'Challenge Unconfirmed',
                text: "You have not confirmed or denied the completion of your challenge, and your incentive has been donated to your chosen charity."
              }
            });
            await Post.findByIdAndUpdate(post._id, { completed: false }, { new: true });
          }
        }
      }
    } catch (err) {
      console.error("Error in CheckForExpiredPosts:", err);
    }
  },

  RunScheduledChecks: async () => {
    await PostsController.CheckForReminderEmails();
    await PostsController.CheckForExpiredPosts();
  }
};

setInterval(PostsController.RunScheduledChecks, 1000 * 60);

module.exports = PostsController;
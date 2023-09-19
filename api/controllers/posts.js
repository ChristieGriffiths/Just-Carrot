const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const User = require('../models/user');
const { sendEmail } = require('./emailController');
const mongoose = require('mongoose');
const postLocks = {};



const PostsController = {
  Index: async (req, res) => {
    try {
      console.log("Function Start"); // Debugging line
      const posts = await Post.find();
      
      for (const post of posts) {
        const sessionId = new Date().getTime(); // Unique Identifier for this operation
        console.log(`Session ID: ${sessionId}, Post ID: ${post._id}`); // Debugging line

        if (postLocks[post._id]) {
          console.log(`Skipped due to lock, Session ID: ${sessionId}`); // Debugging line
          continue;
        }

        postLocks[post._id] = true;

        const datePart = post.completeDate.toISOString().split('T')[0];
        const completeDateTime = new Date(`${datePart}T${post.completeTime}:00`);
        const currentDateTime = new Date();

        const refreshedPost = await Post.findById(post._id);
        
        if (currentDateTime > completeDateTime && refreshedPost.completed === null && refreshedPost.emailReminder === false) {
          console.log(`Inside If Block, Session ID: ${sessionId}`); // Debugging line
          
          const email = await PostsController.GetEmailByPostId({ params: { id: refreshedPost._id } });
          
          if (email) {
            await sendEmail({
              body: {
                to: email,
                subject: 'Completion Time Elapsed',
                text: "Hey there, you have 24 hours to confirm or deny the completion of your challenge otherwise your money will automatically be donated to charity"
              }
            });

            await Post.findByIdAndUpdate(refreshedPost._id, { emailReminder: true }, { new: true });
          }
        }

        postLocks[post._id] = false;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      console.log("Generated token:", token); // Debugging line
      res.status(200).json({ posts: posts, token: token });

      console.log("Function End"); // Debugging line
    } catch (err) {
      console.log("Error in Index:", err); // Debugging line
      return res.status(500).json({ message: err.message });
    }
  },

  GetEmailByPostId: async (req) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return null; // Post not found
      }
      
      const user = await User.findById(post.userId);
      if (!user) {
        return null; // User not found
      }
      
      return user.email;
    } catch (error) {
      console.log(error);
      return null; // Internal server error
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
};



module.exports = PostsController;

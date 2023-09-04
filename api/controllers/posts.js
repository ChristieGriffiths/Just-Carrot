const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: async (req, res) => {
    try {
      let posts = await Post.find();

      // Loop through posts and update those with elapsed times and null 'completed' fields.
      const updatedPosts = await Promise.all(posts.map(async (post) => {
        const completeDateTime = new Date(`${post.completeDate}T${post.completeTime}`);
        const currentDateTime = new Date();
        
        if (currentDateTime > completeDateTime && post.completed === null) {
          post.completed = false;
          await post.save();
        }
        
        return post;
      }));

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: updatedPosts, token: token });
    } catch (err) {
      return res.status(500).json({ message: err.message });
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

const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
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

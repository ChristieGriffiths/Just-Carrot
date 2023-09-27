const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          res.status(409).json({ message: "Email already exists. Please choose a different email." });
        } else {
          res.status(400).json({ message: "Bad request" });
        }
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  FetchEmailById: async (req, res) => { // New method
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId).select("email"); // Fetch only the email field
      if (user) {
        res.status(200).json({ email: user.email });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

module.exports = UsersController;

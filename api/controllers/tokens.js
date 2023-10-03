const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")
const bcrypt = require('bcrypt');

const SessionsController = {

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);
    User.findOne({ email: email }).then(async (user) => {
      
      if (!user) {
        console.log("auth error: user not found")
        res.status(401).json({ message: "auth error" });
      } else if (await bcrypt.compare(password, user.password) === false) {
        console.log("auth error: passwords do not match")
        res.status(401).json({ message: "auth error" });
      } else {
        // console.log(user);
        const token = await TokenGenerator.jsonwebtoken(user.id)
        console.log(token);
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;

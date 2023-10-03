const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const imagePath = path.join(__dirname, "./assets/logo.png");
const imageAsBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
require('dotenv').config();

const sendEmail = async (req, res) => {

  const { to, subject, text } = req.body;
  let transporter = await nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log("Transporter Verification Error:", error);
    } else {
      console.log("Transporter is good to send mail");
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    html: `<p>${text}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Send successful");
    console.log(info);
    res.json({ status: true, data: "Email Send successful" });
  } catch (error) {
    // Debug: Log the error
    console.log('Error Sending Email:', error);
    res.status(500).send(error);
  }
};

module.exports = {
  sendEmail,
};

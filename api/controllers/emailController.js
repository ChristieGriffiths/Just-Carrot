const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const imagePath = path.join(__dirname, './assets/logo.png');
const imageAsBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <p>${text}</p>
      <img src="data:image/jpeg;base64,${imageAsBase64}" style="width:200px;" alt="Some description" />
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent: ' + info.response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  sendEmail,
};

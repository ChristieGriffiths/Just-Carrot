import axios from 'axios';

export const sendEmail = (type, challengeName) => {
  let emailData;

  if (type === 'success') {
    emailData = {
      to: 'christiegriffiths@outlook.com', // Replace with the actual user's email
      subject: 'Congratulations!',
      text: `Congratulations - Great Job on completing your challenge of ${challengeName}!`
    };
  } else {
    emailData = {
      to: 'christiegriffiths@outlook.com', // Replace with the actual user's email
      subject: 'Nice Try!',
      text: `Unlucky but nice try! On the bright side, you donated to ${challengeName}.`
    };
  }

  axios.post('/email/send', emailData)
    .then(response => {
      console.log('Email sent successfully', response.data);
    })
    .catch(error => {
      console.log('Error sending email', error);
    });
};

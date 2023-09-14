import axios from 'axios';

export const sendEmail = (type, challengeName, incentiveAmount) => {
  let emailData;

  if (type === 'success') {
    emailData = {
      to: 'christiegriffiths@outlook.com', // Replace with the actual user's email
      subject: 'Congratulations!',
      text: `Congratulations - Great Job on completing your challenge of ${challengeName}! Your £${incentiveAmount} will be back in your account within 5 working days!`
    };
  } else {
    emailData = {
      to: 'christiegriffiths@outlook.com', // Replace with the actual user's email
      subject: 'Nice Try!',
      text: `Unlucky but nice try! On the bright side, you donated £${incentiveAmount} to ${challengeName}.`
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

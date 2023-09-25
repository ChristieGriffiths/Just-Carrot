import axios from 'axios';

export const fetchUserEmailById = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(`/users/${userId}`)
      .then(response => {
        const email = response.data.email;
        console.log('Fetched email:', email);
        resolve(email); // Resolve the promise with the email
      })
      .catch(error => {
        console.log('Error fetching email:', error);
        reject(error); // Reject the promise with the error
      });
  });
};

export const sendEmail = (type, email, challengeName, incentiveAmount) => {
  let emailData;

  if (type === 'success') {
    emailData = {
      to: email,
      subject: 'Congratulations!',
      text: `Congratulations - Great Job on completing your challenge of ${challengeName}! Your £${incentiveAmount} will be back in your account within 5 working days!`
    };
  } else {
    emailData = {
      to: email,
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

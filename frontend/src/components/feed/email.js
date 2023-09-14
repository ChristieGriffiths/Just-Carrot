import axios from 'axios';

export const fetchEmail = async (postId, token) => {
  try {
    const response = await fetch(`/posts/${postId}/email`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data.email;
    } else {
      console.log('Failed to fetch email');
      return null;
    }
  } catch (error) {
    console.log('An error occurred while fetching the email', error);
    return null;
  }
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

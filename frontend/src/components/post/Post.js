import React, { useState, useEffect } from 'react';
import './Post.css';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Post = ({ post, token, onUpdate }) => {
    const [remainingTime, setRemainingTime] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
      const calculateTimeLeft = () => {
        const dateOnly = post.completeDate.split('T')[0];

        const targetDateStr = `${dateOnly}T${post.completeTime}`;
        const targetDate = new Date(targetDateStr);
    
        const now = new Date();
        const timeLeft = targetDate - now;
    
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        if (timeLeft > 0) {
          setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setRemainingTime('Expired');
        }
      };

      const timerId = setInterval(calculateTimeLeft, 1000);
  
      return () => clearInterval(timerId);
    }, [post]);

  if (post.completed !== null) {
    return null;
  }

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
  try {
    const response = await fetch(`/posts/${post._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        completed: true
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      onUpdate(data);
      handleRefund();
    } else if (response.status === 400) {
      console.log("Bad request");
    } else {
      console.log("Failed to update");
    }
  } catch (error) {
    console.log("An error occurred", error);
  }
};
  
  const handleRefund = async () => {
    try {
      const response = await fetch('http://localhost:4000/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentIntentId: post.paymentIntentId,
        }),
      });
  
      if (response.ok) {
        console.log("Refund Successful");
      } else {
        console.log(`Refund Failed with status: ${response.status}, ${response.statusText}`);
      }
  
    } catch (error) {
      console.log("An error occurred while refunding", error);
    }
  };
  


  return (
    <div className="apple-style-container">
      <article data-cy="post" key={post.challenge}>
        Challenge: {post.challenge} <br />
        Complete by: {remainingTime} <br />
        Incentive: £ {post.incentiveAmount} <br />
        Charity: {post.chosenCharity} <br />
        {showConfirmation ? (
          <>
            <button onClick={handleConfirm}>Are you sure?</button>
            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleShowConfirmation}>Confirm</button>
        )}
      </article>
    </div>
  );
};

export default Post;

import React, { useState, useEffect } from 'react';
import './Challenge.css';

const Challenge = ({ challenge, token, onUpdate}) => {
    const [remainingTime, setRemainingTime] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
      const calculateTimeLeft = () => {
        const dateOnly = challenge.completeDate.split('T')[0];

        
        const targetDateStr = `${dateOnly}T${challenge.completeTime}`;
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
    }, [challenge]);

  if (challenge.completed !== null) {
    return null;
  }

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    console.log("handleConfirm called"); // Debugging line
  try {
    const response = await fetch(`/api/challenges/${challenge._id}`, {
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
      console.log("Status is 200, setting showSuccessMessage to true"); 
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

const handleUnsuccessful = async () => {
  try {
    const response = await fetch(`/api/challenges/${challenge._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        completed: false
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      onUpdate(data);
      // onUnsuccessful(post._id, post.challenge, post.incentiveAmount);
    } else {
      console.log("Failed to mark as unsuccessful");
    }
  } catch (error) {
    console.log("An error occurred", error);
  }
};
  
  const handleRefund = async () => {
    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentIntentId: challenge.paymentIntentId,
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
      <article data-cy="challenge" key={challenge.challenge}>
        <div>
          <span style={{ fontSize: '2rem' }}>Challenge: </span> {/* Bigger font */}
          {challenge.challenge} 
        </div>
        <div>Complete by: {remainingTime}</div>
        <div>Incentive: £ {challenge.incentiveAmount}</div>
        <div>Charity: {challenge.chosenCharity}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {showConfirmation ? (
            <>
              <button onClick={handleConfirm}>Are you sure?</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={handleShowConfirmation}>Confirm</button>
              <button onClick={handleUnsuccessful}>Unsuccessful</button>
            </>
          )}
        </div>
      </article>
    </div>
  );
};

export default Challenge;

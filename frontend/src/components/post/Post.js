import React from 'react';
import './Post.css';

const Post = ({ post, token, onUpdate }) => {
  // Only proceed if the "completed" field is null
  if (post.completed !== null) {
    return null;
  }

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
        console.log("Successfully updated");
        let data = await response.json();
        onUpdate(data);
      } else if (response.status === 400) {
        // Handle bad request
        console.log("Bad request");
      } else {
        // Handle other statuses
        console.log("Failed to update");
      }

    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <div className="apple-style-container">
      <article data-cy="post" key={post.challenge}>
        Challenge: {post.challenge} <br />
        Complete by: {post.completeDate} <br />
        Incentive: £ {post.incentiveAmount} <br />
        Charity: {post.chosenCharity} <br />
        <button onClick={handleConfirm}>Confirm</button>
      </article>
    </div>
  );
};

export default Post;

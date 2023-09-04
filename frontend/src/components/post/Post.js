import React from 'react';
import './Post.css';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

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
        const data = await response.json();
        onUpdate(data);
      } else if (response.status === 400) {
        console.log("Bad request");
      } else {
        console.log("Failed to update");
      }

    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  const formattedDate = formatDate(post.completeDate);

  return (
    <div className="apple-style-container">
      <article data-cy="post" key={post.challenge}>
        Challenge: {post.challenge} <br />
        Complete by: {formattedDate} {post.completeTime} <br />
        Incentive: £ {post.incentiveAmount} <br />
        Charity: {post.chosenCharity} <br />
        <button onClick={handleConfirm}>Confirm</button>
      </article>
    </div>
  );
};

export default Post;

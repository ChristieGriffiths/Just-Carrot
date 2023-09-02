import React from 'react';
import './Post.css'; // Assuming you'll put the apple-style-container CSS class in Post.css

const Post = ({ post }) => {
  return (
    <div className="apple-style-container">
      <article data-cy="post" key={ post.challenge }>
        Challenge: { post.challenge } <br></br>
        Complete by: { post.completeDate } <br></br>
        Incentive: £ { post.incentive } <br></br>
        Charity: { post.Chosencharity }
      </article>
    </div>
  );
}

export default Post;

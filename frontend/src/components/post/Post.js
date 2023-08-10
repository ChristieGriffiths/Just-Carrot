import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post.challenge }>Challenge: { post.challenge } <br></br> Complete by: { post.completeDate } <br></br> Incentive: £ { post.incentive} <br></br> Charity: { post.Chosencharity } 
    <br></br> <br></br>
    </article>
  )
}

export default Post;

import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'; // Assuming jwt_decode is imported
import Post from '../post/Post';
import ChallengeCreateForm from '../ChallengeCreateForm/ChallengeCreateForm';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewForm, setViewForm] = useState(false);

  useEffect(() => {
    if(token) {
      const decoded = jwt_decode(token);
      const userId = decoded.user_id; // Extract user_id from token
      
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));

          // Filter posts based on logged-in user's ID
          const userPosts = data.posts.filter(post => post.userId === userId);
          setPosts(userPosts);
        });
    }
  }, [token]); // Rerun useEffect when token changes
    
  const newChallenge = () => {
    setViewForm(true);
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  }

  if(token) {
    return (
      <>
        <h2 id='targets'>Targets</h2>
        <div className='form-container'>
          {viewForm ? (
             <ChallengeCreateForm 
             token={token} 
             setToken={setToken}
             setViewForm={setViewForm}
           />
          ) : null}
        </div>
        
        <div id='feed' role="feed">
          {posts.map(
            (post) => ( <Post post={post} key={post._id} token={token} /> )
          )}
        </div>

        <button className="NewChallenge" onClick={newChallenge}>
          New Challenge +
        </button>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </>
    );
  } else {
    navigate('/signin');
  }
}

export default Feed;

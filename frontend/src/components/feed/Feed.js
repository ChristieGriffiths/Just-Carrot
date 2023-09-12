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
    if (token) {
      try {
        // Decode the token and check for expiration
        const decoded = jwt_decode(token);
        const userId = decoded.user_id;
        const exp = decoded.exp;

        // Check if token is expired
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (exp < currentTime) {
          console.log("Token has expired");
          navigate("/login");
          return;
        }

        // Fetch data
        fetch("/posts", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.posts) {
            window.localStorage.setItem("token", data.token);
            setToken(window.localStorage.getItem("token"));
            const userPosts = data.posts.filter(post => post.userId === userId);
            setPosts(userPosts);
          } else {
            // Navigate to login if the token is invalid
            navigate("/login");
          }
        })
        .catch(error => {
          // Handle errors or navigate to login
          console.error("Error fetching posts:", error);
          navigate("/login");
        });

      } catch (error) {
        // Handle JWT decode error or navigate to login
        console.error("JWT decode error:", error);
        navigate("/login");
      }
    } else {
      // Navigate to login if no token is found
      navigate("/login");
    }
  }, [token, navigate]);
  
  const newChallenge = () => {
    setViewForm(true);
  }

  const onUpdate = (updatedPost) => {
    const updatedPosts = posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

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
            (post) => ( <Post post={post} key={post._id} token={token}  onUpdate={onUpdate}/> )
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

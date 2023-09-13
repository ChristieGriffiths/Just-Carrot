import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'; // Assuming jwt_decode is imported
import Post from '../post/Post';
import ChallengeCreateForm from '../ChallengeCreateForm/ChallengeCreateForm';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewForm, setViewForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState(null);


  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const userId = decoded.user_id;
        const exp = decoded.exp;

        const currentTime = Date.now() / 1000; 
        if (exp < currentTime) {
          console.log("Token has expired");
          navigate("/login");
          return;
        }

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
            navigate("/login");
          }
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
          navigate("/login");
        });

      } catch (error) {
        console.error("JWT decode error:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  
  
  const newChallenge = () => {
    setViewForm(true);
  }

  const onUpdate = (receivedData) => {
    const updatedPost = receivedData.post;
    const updatedPosts = posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    );
    setPosts([...updatedPosts]);
    setCompletedChallenge(receivedData.post.challenge);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000); 
  };

  const showTemporaryMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000); // hides after 10 seconds
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
              navigate={navigate} 
            />
          ) : (
            <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post
                  post={post} 
                  key={post._id} 
                  token={token} 
                  onUpdate={onUpdate} 
                   /> )
              )}
            </div>
          )}
           {showSuccessMessage && (
        <div className="success-message">
          Congratulations - Great Job on completing your challenge of {completedChallenge}!
        </div>
      )}
        </div>

        {!viewForm && (
          <button className="NewChallenge" onClick={newChallenge}>
            New Challenge +
          </button>
        )}
        
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

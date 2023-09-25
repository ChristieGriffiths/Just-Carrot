import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'; // Assuming jwt_decode is imported
import Post from '../post/Post';
import ChallengeCreateForm from '../ChallengeCreateForm/ChallengeCreateForm';
import './Feed.css';
import '../Navbar.css';
import '../Footer.css';

import { sendEmail, fetchUserEmailByEmail, fetchUserEmailById } from './email'; 
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewForm, setViewForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState(null);
  const [showUnsuccessfulMessage, setShowUnsuccessfulMessage] = useState(false);
  const [unsuccessfulChallenge, setUnsuccessfulChallenge] = useState(null);

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

  const goToHome = () => {
    setViewForm(false);
  };

  const onUpdate = async (receivedData) => {
    const updatedPost = receivedData.post;
    const updatedPosts = posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    );
    setPosts([...updatedPosts]);
    try {
      const email = await fetchUserEmailById(receivedData.post.userId);
      if (email) {
        console.log('About to send email');
        await sendEmail('success', email, receivedData.post.challenge, receivedData.post.incentiveAmount);
        console.log('Email sent');
      }
    
      console.log('About to set completed challenge');
      setCompletedChallenge(receivedData.post.challenge);
      console.log('Completed challenge set');
    
      console.log('About to show success message');
      setShowSuccessMessage(true);
      console.log('Success message shown:', showSuccessMessage);
    
      setTimeout(() => {
        console.log('About to hide success message');
        setShowSuccessMessage(false);
        console.log('Success message hidden');
      }, 10000);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };
  
  const onUnsuccessful = async (challengeId, challengeName, incentiveAmount) => {
    const email = await fetchUserEmailById(challengeId);
    if (email) {
      sendEmail('unsuccess', email, challengeName, incentiveAmount);
    }
    setUnsuccessfulChallenge(challengeName);
    setShowUnsuccessfulMessage(true);
    setShowSuccessMessage(false);
    setTimeout(() => {
      setShowUnsuccessfulMessage(false);
    }, 10000)
  };


  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  }

  if (token) {
    return (
      <>
        <div className="feed-background">

          <div className="navbar">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <div className="navbar-buttons">
              <button onClick={goToHome} className="navbar-button">Home</button>
              <button onClick={newChallenge} className="navbar-button">Create Challenge</button>
              <button onClick={logout} className="navbar-button">Log out</button>
            </div>
          </div>

        {showSuccessMessage && (
            <div className="success-message">
              Congratulations - Great Job on completing your challenge of {completedChallenge}!
            </div>
          )}
          {showUnsuccessfulMessage && (
            <div className="unsuccessful-message">
              Unlucky but nice try! On the bright side, you donated to {unsuccessfulChallenge}.
            </div>
          )}

          <div className="form-container">
            {viewForm ? (
              <ChallengeCreateForm 
                token={token}
                setToken={setToken}
                setViewForm={setViewForm}
                navigate={navigate}
              />
            ) : (
              <div id="feed" role="feed">
                {posts.map((post) => (
                  <Post
                    post={post}
                    key={post._id}
                    token={token}
                    onUpdate={onUpdate}
                    onUnsuccessful={onUnsuccessful}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="website-footer">
          <div className="footer-content">
            <p>Copyright © 2023 Just Carrot</p>
            <div className="footer-links">
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
  
      </>
    );
  } else {
    navigate('/signin');
  }

}

export default Feed;

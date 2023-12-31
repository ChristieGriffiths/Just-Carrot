import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Challenge from '../challenge/Challenge';
import ChallengeCreateForm from '../ChallengeCreateForm/ChallengeCreateForm';
import './Feed.css';
import '../Navbar.css';
import '../Footer.css';
import useLoading from '../Loading';
import BarLoader from "react-spinners/BarLoader";

import { sendEmail, fetchUserEmailById } from './email'; 
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Feed = ({ navigate }) => {
  const [challenges, setChallenges] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewForm, setViewForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState(null);
  const [showUnsuccessfulMessage, setShowUnsuccessfulMessage] = useState(false);
  const [unsuccessfulChallenge, setUnsuccessfulChallenge] = useState(null);
  const [showPaymentMessage, setShowPaymentMessage] = useState(null)
  const loading = useLoading(2000)

  useEffect(() => {

    if (token) {
      try {
        console.log(token);
        const decoded = jwt_decode(token);
        const userId = decoded.user_id;
        const exp = decoded.exp;
        console.log(decoded);
        const currentTime = Date.now() / 1000; 
        if (exp < currentTime) {
          console.log("Token has expired");
          navigate("/login");
          return;
        }
        
        fetch("/api/challenges", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.challenges) {
            console.log(data.challenges);
            window.localStorage.setItem("token", data.token);
            setToken(window.localStorage.getItem("token"));
            const userChallenges = data.challenges.filter(challenge => challenge.userId === userId);
            setChallenges(userChallenges);
          } else {
            navigate("/login");
          }
        })
        .catch(error => {
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
    setShowSuccessMessage(false)
    setShowUnsuccessfulMessage(false)
    setShowPaymentMessage(false)
    setViewForm(true);
  }

  const HideChallengeForm = () => {
    setViewForm(false);
  };

  const onUpdate = async (receivedData) => {
    try {
      const updatedChallenge = receivedData.challenge;
      const updatedChallenges = challenges.map(challenge => 
        challenge._id === updatedChallenge._id ? updatedChallenge : challenge
      );
      setChallenges([...updatedChallenges]);
      
      const email = await fetchUserEmailById(receivedData.challenge.userId);
      if (!email) {
        console.error('Email not found for user ID:', receivedData.challenge.userId);
        return;
      }
  
      if (receivedData.challenge.completed) {
        await sendEmail('success', email, receivedData.challenge.challenge, receivedData.challenge.incentiveAmount);
        setCompletedChallenge(receivedData.challenge.challenge);
        setShowSuccessMessage(true);
      } else { 
        await sendEmail('unsuccess', email, receivedData.challenge.challenge, receivedData.challenge.incentiveAmount);
        setUnsuccessfulChallenge(receivedData.challenge.chosenCharity);
        setShowUnsuccessfulMessage(true);
      }
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowUnsuccessfulMessage(false);
      }, 10000);
  
    } catch (error) {
      console.error('An error occurred during the onUpdate function:', error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  }

  if (token) {
    return (
      <>
        {loading ? (
          <div className="loader-container">
            <BarLoader
              color={"#F37A24"}
              loading={loading}
              size={150}
            />
          </div>
        ) : (
          <>
            <div className="feed-background">
              <div className="navbar">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <div className="navbar-buttons">
                  <button onClick={HideChallengeForm} className="navbar-button">Home</button>
                  <button onClick={newChallenge} className="navbar-button">Create Challenge</button>
                  <button onClick={logout} className="navbar-button">Log out</button>
                </div>
              </div>

              {showPaymentMessage && (
                <div className="payment-message">
                  Payment Success, Good luck with your challenge!
                </div>
              )}

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
                    setShowPaymentMessage={setShowPaymentMessage}
                    navigate={navigate}
                  />
                ) : (
                  <div id="feed" role="feed">
                    {challenges.map((challenge) => (
                      <Challenge
                        challenge={challenge}
                        key={challenge._id}
                        token={token}
                        onUpdate={onUpdate}
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
        )}
      </>
    );
  } else {
    navigate('/signin');
  }
};

export default Feed;

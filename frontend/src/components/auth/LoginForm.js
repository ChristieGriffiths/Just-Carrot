import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './LoginForm.css'
import logo from '../../assets/logo.png';
import loginImage from '../../assets/loginImage.jpg';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("Incorrect password, \n error message before change:", errorMessage)
      setErrorMessage("Incorrect email or password")
      console.log("Incorrect password, \n error message after change:", errorMessage)
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  
  return (
    <div className="main-container">
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-items">
          <button className="navbar-button" onClick={() => window.scrollTo(0, 0)}>How it works</button>
          <button className="navbar-button" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>About Us</button>
          <Link to="/signup" className="navbar-button">Sign Up</Link>
          <Link to="/login" className="navbar-button">Sign In</Link>
        </div>
      </div>
      <div className="content">
        <h1 id="Log in">Log in</h1>
        <p>{errorMessage}</p>
        <form onSubmit={handleSubmit}>
          <input placeholder='Email' id="email" type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder='Password' id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input role='submit-button' id='submit' type="submit" value="Submit" />
        </form>
        <button onClick={() => navigate('/signup')}>Go to Sign Up</button>
        <div className="login-image-container">
          <img src={loginImage} alt="img" />
        </div>
      </div>
      <footer className="website-footer">
        <div className="footer-content">
          <p>&copy; 2023 YourWebsiteName. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LogInForm;

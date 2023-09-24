import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './LoginForm.css'
import '../Navbar.css';
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
    <div className="log-in-main-container">
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="auth-links"> 
          <Link to="/" className="navbar-button">Home</Link>
          <Link to="/signup" className="navbar-button">Sign Up</Link>
        </div>
      </div>
      <div className="content">
   
        <p>{errorMessage}</p>
        <form className="Login-SignUp-Form" onSubmit={handleSubmit}>
          <input placeholder='Email' id="email" type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder='Password' id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="SignUpInput" id='submit' type="submit" value="Submit" />
        </form>
      
    
      </div>
      <footer className="website-footer">
        <div className="footer-content">
          <p>&copy; 2023 Just Carrot. All rights reserved.</p>
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

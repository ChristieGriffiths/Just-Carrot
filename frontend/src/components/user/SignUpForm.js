import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import signUpImage from '../../assets/signUpImage.jpeg';
import './SignUpForm.css';
import '../Navbar.css';
import '../Footer.css';


const SignUpForm = ({ navigate }) => {
  const [firstName, setFirstName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch('/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, surname: surname, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          response.json().then(data => {
            setValidationError({ password: data.message });
          });
        }
      })
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleSurnameChange = (event) => {
    setSurname(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  return (
    <div className="sign-up-main-container">
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
          <Link to="/" className="navbar-button link-button">Home</Link>
          <Link to="/login" className="navbar-button link-button">Sign In</Link>
      </div>
      <div className="content">

        <form className="SignUpForm" onSubmit={handleSubmit}>
          <input placeholder="First name" id="firstName" type='text' value={firstName} minLength="2" onChange={handleFirstNameChange} required />
          <input placeholder="Surname" id="surname" type='text' value={surname} minLength="2" onChange={handleSurnameChange} required />
          <input placeholder="Email" id="email" type='text' pattern='^.*@.*\.(com|co\.uk)$' title="Please enter a valid email address" value={email} minLength="3" onChange={handleEmailChange} required />
          <input placeholder="Password" id="password" type='password' value={password} minLength="5" onChange={handlePasswordChange} required />
          <p className="validation-error"> {validationError.password}</p>
          <input className= "SignUpInput" type="submit" value="Submit" />
        </form>
  
      </div>
      <div className="website-footer">
        <div className="footer-content">
          <p>Copyright © 2023 Just Carrot</p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
import React from 'react';
import './AboutUs.css';
import '../Navbar.css';
import '../Footer.css';
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png';
import aboutUs from '../../assets/aboutUs.png';

const AboutUs = () => {

  return (
    <>
   <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-button"> 
        <Link to="/" className="navbar-button">Home</Link>
        <Link to="/signup" className="navbar-button">Sign Up</Link>
        <Link to="/login" className="navbar-button">Sign In</Link>
        </div>
      </div>
        <div className="content-container">
          <div className="about-us-container" id="about-us-container">
            <img src={aboutUs} alt="About Us" />
          </div>
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
    
    </>
  );
}

export default AboutUs;
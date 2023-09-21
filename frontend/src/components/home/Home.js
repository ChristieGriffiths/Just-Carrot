import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png';
import homePageImage from '../../assets/HomePageImage.png';
import howItWorks from '../../assets/howItWorks.png';
import aboutUs from '../../assets/aboutUs.png';

const Home = () => {
  const handleHowItWorksClick = () => {
    const howItWorksImageElement = document.getElementById('how-it-works-image');
    if (howItWorksImageElement) { howItWorksImageElement.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-items">
          <button className="navbar-button" onClick={handleHowItWorksClick}>How it works</button>
          <Link to="/aboutus" className="navbar-button link-button">About us</Link> {/* added link-button class */}
          <div className="auth-links">
            <Link to="/signup" className="navbar-button link-button">Sign Up</Link>
            <span className="auth-separator">/</span>
            <Link to="/login" className="navbar-button link-button">Sign In</Link>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="home-page-container">
          <img src={homePageImage} alt="Home Page" />
        </div>
        <div className="how-it-works-image" id="how-it-works-image">
          <img src={howItWorks} alt="How It Works" />
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

export default Home;

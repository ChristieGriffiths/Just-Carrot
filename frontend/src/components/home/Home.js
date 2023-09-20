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

  const handleAboutUsClick = () => {
    const aboutUsImageElement = document.getElementById('about-us-container');
    if (aboutUsImageElement) { aboutUsImageElement.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-items">
          <button className="navbar-button" onClick={() => window.scrollTo(0, 0)}>How it works</button>
          <button className="navbar-button" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>About Us</button>
          <Link to="/signup" className="navbar-button">Sign Up</Link>
          <Link to="/login" className="navbar-button">Sign In</Link>
        </div>
      </div>
        <div className="content-container">
          <div className="home-page-container">
            <img src={homePageImage} alt="Home Page" />
          </div>
          <div className="how-it-works-image" id="how-it-works-image">
            <img src={howItWorks} alt="How It Works" />
          </div>
          <div className="about-us-container" id="about-us-container">
            <img src={aboutUs} alt="About Us" />
          </div>
        </div>
    
    </>
  );
}

export default Home;

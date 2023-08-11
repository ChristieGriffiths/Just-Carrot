import React from 'react';
import './Home.css'
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png';
import homePageImage from '../../assets/homePageImage.png';
import howItWorks from '../../assets/howItWorks.png';
import aboutUs from '../../assets/aboutUs.png';

const Home = () => {
  const handleHowItWorksClick = () => {
    const howItWorksImageElement = document.getElementById('how-it-works-image');
    if (howItWorksImageElement) { howItWorksImageElement.scrollIntoView({ behavior: 'smooth' }); }

  };
  const handleAboutUsClick = () => {
    const aboutUsImageElement = document.getElementById('about-us-container');
    if (aboutUsImageElement) { aboutUsImageElement.scrollIntoView({ behavior: 'smooth' });}
  };

  return (
    <div className="home-container">
        <h1 className="how-it-works" onClick={handleHowItWorksClick}>how it works</h1>
        <h1 className="about-us" onClick={handleAboutUsClick}>about us</h1>
        <h1 className="sign-up-in"><Link to="/signup">sign up</Link>/<Link to="/login">sign in</Link></h1>
      <header className="top-banner">
        <img src={logo} alt="Logo" />
      </header>
      <div className="content-container">
        <div className="home-page-container">
          <img src={homePageImage} alt="img" />
        </div>
        <div className="how-it-works-image" id="how-it-works-image">
          <img src={howItWorks} alt="img" />
        </div>
        <div className="about-us-container" id="about-us-container">
          <img src={aboutUs} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default Home;
import React from 'react';
import './Home.css';
import '../Footer.css';
import '../Navbar.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import homePageImage from '../../assets/HomePageImage.jpg';
import howItWorks from '../../assets/howItWorks.png';

const Home = () => {
  const handleHowItWorksClick = () => {
    const howItWorksImageElement = document.getElementById('how-it-works-image');
    if (howItWorksImageElement) { howItWorksImageElement.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-button">
        <button className="navbar-button" onClick={handleHowItWorksClick}>How it works</button>
        <Link to="/aboutus" className="navbar-button link-button">About us</Link> {/* added link-button class */}
        <Link to="/signup" className="navbar-button link-button">Sign Up</Link>
        <Link to="/login" className="navbar-button link-button">Sign In</Link>
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
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

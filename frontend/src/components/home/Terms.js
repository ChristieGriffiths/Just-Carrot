import React from 'react';
import './Terms.css';
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png';
import terms from '../../assets/terms.jpg'; // Assuming you meant this to be the privacy image

const Terms = () => {

  return (
    <>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-items">
          <Link to="/" className="navbar-button">Home</Link>
          <Link to="/signup" className="navbar-button">Sign Up</Link>
          <Link to="/login" className="navbar-button">Sign In</Link>
        </div>
      </div>
      <div className="content-container">
        <img src={terms} alt="Privacy Policy" className="privacy-image" />
        <p className="privacy-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          Donec in efficitur leo. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium.
        </p>
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

export default Terms;

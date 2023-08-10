import React from 'react';
import './Home.css'
import logo from '../../assets/logo.png';
import homePageImage from '../../assets/homePageImage.png';
import aboutUs from '../../assets/aboutUs.png';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
        <h1 className="how-it-works">how it works</h1>
        <h1 className="about-us">about us</h1>
        <h1 className="sign-up-in"><Link to="/signup">sign up</Link>/<Link to="/login">sign in</Link></h1>
      <header className="top-banner">
        <img src={logo} alt="Logo" />
      </header>
      <div className="content-container">
        <div className="logo-container">
          <img src={homePageImage} alt="Logo" />
        </div>
        <div className="logo-container">
          <img src={aboutUs} alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;
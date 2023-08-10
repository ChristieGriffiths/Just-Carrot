import React from 'react';
import './Home.css'
import logo from '../../assets/logo.png';
import HomePageImage from '../../assets/HomePageImage.png';

const Home = () => {
  return (
    <div className="home-container">
        <h1 className="how-it-works">how it works</h1>
        <h1 className="about-us">about us</h1>
        <h1 className="sign-up-in">sign up/in</h1>
      <header className="top-banner">
        <img src={logo} alt="Logo" />
      </header>
      <div className="content-container">
        <div className="logo-container">
          <img src={HomePageImage} alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;
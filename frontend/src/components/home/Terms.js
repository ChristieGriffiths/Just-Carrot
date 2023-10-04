import React from 'react';
import './Privacy.css';
import '../Navbar.css';
import '../Footer.css';
import BarLoader from "react-spinners/BarLoader";
import useLoading from '../Loading';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import terms from '../../assets/terms.jpg'; // Assuming you meant this to be the privacy image

const Terms = () => {
  const loading = useLoading(2000)

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
      {loading ? (
        <div className="loader-container"> {/* Loading block */}
          <BarLoader
            color={"#F37A24"}
            loading={loading}
            size={150}
          />
        </div>
      ) : (
        <div className="content-container"> {/* Content block */}
          <div className="privacy-content">
            <img src={terms} alt="Terms Policy" className="privacy-image" />
            <p className="privacy-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
              Donec in efficitur leo. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
              Nullam dictum felis eu pede mollis pretium.
            </p>
          </div>
        </div>
      )}
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
};

export default Terms;

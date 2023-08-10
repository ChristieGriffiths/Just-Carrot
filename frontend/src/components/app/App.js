import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import logo from '../../assets/logo.png';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <header className="banner">
        <img src={logo} alt="Logo" />
      </header>
      <Routes>
        <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
        <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
        <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
      </Routes>
    </div>
  );
}

export default App;

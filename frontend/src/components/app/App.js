import './App.css';
import Home from '../home/Home';
import AboutUs from '../home/AboutUs';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import logo from '../../assets/logo.png';
import {
  useNavigate,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
        <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
        <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
      </Routes>
      <header className="bottomba-banner">
      </header>
    </div>
  );
}

export default App;

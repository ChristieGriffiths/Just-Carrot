import './App.css';
import Home from '../home/Home';
import Privacy from '../home/Privacy';
import Terms from '../home/Terms';
import AboutUs from '../home/AboutUs';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Feed from '../feed/Feed'
import {Helmet} from "react-helmet";
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";


const App = () => {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Just Carrot</title>
          <meta name="Title" content="favicon title" />
      </Helmet>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/challenge' element={<Feed navigate={useNavigate()} />} />
        <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
        <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
      </Routes>
      <header className="bottomba-banner">
      </header>
    </div>
  );
}

export default App;

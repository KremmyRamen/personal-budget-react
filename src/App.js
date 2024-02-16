import './App.css';
import React from 'react';

import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Menu from './Menu/Menu'
import Hero from './Hero/Hero'
import HomePage from './HomePage/HomePage'
import Footer from './Footer/Footer'
import LoginPage from './LoginPage/LoginPage'
import AboutPage from './AboutPage/AboutPage'



export default function App() {
  return (
    <div>
      <Router>
      <Menu></Menu>
      <Hero></Hero>
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage/>}/> 
          <Route path="/login" element={<LoginPage/>}/> 
          <Route path="/" element={<HomePage/>}/> 
        </Routes> 
      </div>
      <HomePage></HomePage>
      <Footer></Footer>
      </Router>
    </div>
  );
}


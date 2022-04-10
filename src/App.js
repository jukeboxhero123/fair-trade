import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';
import Trades from './components/Trades';
import Profile from './components/Profile';
import Nav from './components/Nav';
import CreateAccount from './components/CreateAccount';
import ConfirmAccount from './components/ConfirmAccount';
import { Account } from './components/Account';

export default function App() {
  return (
    <Router>
      <Account>
        <Nav/>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createAccount" element={<CreateAccount/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/trades" element={<Trades/>} />
          <Route path="/confirmAccount" element={<ConfirmAccount/>} />
        </Routes>
      </Account>
    </Router>
  )
}

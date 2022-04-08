import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';
import Trades from './components/Trades';
import Profile from './components/Profile';
import Nav from './components/Nav';
import CreateAccount from './components/CreateAccount';

export default function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/createAccount" component={CreateAccount} />
        <Route path="/profile" component={Profile} />
        <Route path="/trades" component={Trades} />
      </div>
    </Router>
  )
}

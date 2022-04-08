import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Fair Trade</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
        <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="navbar-item">
        <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="navbar-item">
        <Link to="/createAccount" className="nav-link">Create Account</Link>
        </li>
        <li className="navbar-item">
        <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li className="navbar-item">
        <Link to="trades" className="nav-link">Trades</Link>
        </li>      
      </ul>
      </div>
    </nav>
  );
}

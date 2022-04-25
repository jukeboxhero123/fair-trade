import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import ItemInputPopup from './ItemInputPopup';

export default function Nav() {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '500px'
    },
  };

  const [displayItemInput, setDisplayItemInput] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Fair Trade</Link>
        <button onClick={() => { setDisplayItemInput(true) }}>Create New Item</button>
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
      <Modal isOpen={displayItemInput} style={customStyles} ariaHideApp={false}>
          <ItemInputPopup onClose={() => {setDisplayItemInput(false)}}/>
      </Modal>
    </div>
  );
}

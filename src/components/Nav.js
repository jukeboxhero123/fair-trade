import React, { useState } from "react";
import Modal from 'react-modal';
import ItemInputPopup from './ItemInputPopup';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

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
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/home" className="flex items-center">
              <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/81/pregnant-woman_1f930.png" className="mr-3 h-6 sm:h-9" alt="FairTrade Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">FairTrade</span>
          </a>
          <button onClick={() => { setDisplayItemInput(true) }} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700\">Create New Item</button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link to="/home" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
              </li>
              <li>
                <Link to="/trades" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Trades</Link>
              </li>
              <li>
                <Link to="/profile" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</Link>
              </li>
            </ul>
          </div>
          <LogoutButton/>
        </div>
      </nav>
      
      <Modal isOpen={displayItemInput} style={customStyles} ariaHideApp={false}>
          <ItemInputPopup onClose={() => {setDisplayItemInput(false)}}/>
      </Modal>
    </div>
  );
}

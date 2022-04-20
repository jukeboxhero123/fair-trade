import React, { useState, useContext } from 'react';
import OnboardingPopup from './OnboardingPopup';
import Modal from 'react-modal';
import LogoutButton from './LogoutButton';
import { AccountContext } from '../contexts/AccountContext'
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

export default function Home() {
    const { user } = useContext(AccountContext);
    const [displayOnboard, setDisplayOnboard] = useState(!user.is_onboarded);

    return (
        <div>
            <LogoutButton/>
            <h3>Welcome {user.first_name}</h3>
            <h1>Home page: where you can search for items (future recommended page)</h1>
            <Modal isOpen={displayOnboard} style={customStyles} ariaHideApp={false}>
                <OnboardingPopup setDisplayOnboard={setDisplayOnboard}/>
            </Modal>
        </div>
        
    )
}

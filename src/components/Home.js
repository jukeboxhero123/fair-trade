import React, { useState } from 'react';
import OnboardingPopup from './OnboardingPopup';
import Modal from 'react-modal';

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
    const [displayOnboard, setDisplayOnboard] = useState(false)

    const openOnboarding =()=>{
        // change in future to open depending on onBoarding value in yongo
        setDisplayOnboard(true)
    }
    const closeOnboarding =()=>{
        setDisplayOnboard(false)
    }

    return (
        <div>
            <h1>Home page: where you can search for items (future recommended page)</h1>
            <button onClick={openOnboarding}>Click to Open Onboarding</button>
            <Modal isOpen={displayOnboard} onRequestClose={closeOnboarding} style={customStyles} ariaHideApp={false}>
                <OnboardingPopup onClose={closeOnboarding}/>
            </Modal>
        </div>
        
    )
}

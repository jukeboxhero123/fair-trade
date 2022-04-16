import React, { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useContext(AccountContext);

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => {
                logout(); 
                navigate("../");
            }}>Log Out</button>

        </div>
    );
};

export default LogoutButton;

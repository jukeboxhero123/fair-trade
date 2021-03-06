import React, { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useContext(AccountContext);

    const navigate = useNavigate();

    return (
        <div>
            <button 
                onClick={() => {
                    logout(); 
                    navigate("../");
                }} 
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700\"
            >
                Log Out
            </button>

        </div>
    );
};

export default LogoutButton;

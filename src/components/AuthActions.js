import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Account';
import { useNavigate } from 'react-router-dom';

const AuthActions = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { getSession, logout } = useContext(AccountContext);

    const navigate = useNavigate();

    useEffect(() => {
        getSession()
            .then(session => {
                console.log("Session:", session);
                // Not safe LOL think of better way to do this
                localStorage.setItem("user_uuid", session.accessToken.payload.sub);
                setIsLoggedIn(true);
            })
    }, [getSession])

    return (
        <div>
            {
                isLoggedIn 
                    ? <button onClick={() => { 
                        logout(); 
                        setIsLoggedIn(false); 
                    }}>Log Out</button>
                    : <div>
                        <button onClick={() => { navigate('../login'); }}>Log In</button>
                        <button onClick={() => { navigate('../createAccount'); }}>Sign Up</button>
                    </div>
            }
        </div>
    );
};

export default AuthActions;

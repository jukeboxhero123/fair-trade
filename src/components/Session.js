import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from "./Account";

const Session = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log("Session:", session);
                setIsLoggedIn(true);
            })
    }, [getSession])

    return <div>{isLoggedIn ? "You are logged in" : "Please Login"}</div>
};

export default Session;

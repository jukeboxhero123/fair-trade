import React, { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext'

export default function Profile() {

    const { user } = useContext(AccountContext);

    return (
        <div>
            <h1>Your Profile</h1>
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Second Name: {user.last_name}</p>  
            <p>Address: {user.address}</p>  
            <p>Bio: {user.bio}</p>   
        </div>
    )
}


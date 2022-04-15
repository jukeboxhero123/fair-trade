import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserPool from '../UserPool.js';
import { CognitoUser } from 'amazon-cognito-identity-js';

export default function ConfirmAccount() {

    const location = useLocation();
    const [code, setCode] = useState("");
    const navigate = useNavigate();


    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            Username: location.state.email,
            Pool: UserPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(code, true, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                navigate("../login");
            }
        })
    };

    return (
        <div>
            <h1>Confirm Account</h1>
            <form onSubmit={onSubmit}>
                <label> Verification Code </label>
                <input value={code} onChange={(e) => setCode(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}
import React, { useState } from 'react';
import UserPool from "../UserPool.js"
import { useNavigate, createSearchParams } from 'react-router-dom';

export default function CreateAccount() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                console.log(createSearchParams({ email }).toString());
                navigate("../confirmAccount", {
                    state: {
                        email
                    }
                });
            }
        })
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={onSubmit}>
                <label> Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label> Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Signup</button>
            </form>
        </div>

    )
}
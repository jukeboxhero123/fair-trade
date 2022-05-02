import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AccountContext } from "../contexts/AccountContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate, setSession } = useContext(AccountContext);
    
    const onSubmit = (e) => {
        e.preventDefault();
        authenticate(email, password)
            .then((data) => {
                console.log("LOGGED IN!", data)
                setSession();
            })
            .catch((err) => console.err("LOGIN FAILED", err));
    };

    return (
        <div>
            <h1>Login Account</h1>
            <form onSubmit={onSubmit}>
                <label> Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label> Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/createAccount">Sign up</Link>
        </div>

    )
}

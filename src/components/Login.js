import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from "./Account";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (e) => {
        e.preventDefault();
        authenticate(email, password)
            .then((data) => {
                console.log("LOGGED IN!", data)
                navigate("../home");
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
                <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>

    )
}

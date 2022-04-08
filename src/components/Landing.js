import React from 'react';
export default function Landing() {

    const goToSignIn = () => {
        window.location = '/login'
    }
    return (
        <div>
        <h1>Fair Trade</h1>
        <button onClick={goToSignIn}>Log In</button>
        <button>Sign Up</button>
        </div>
    )
}

import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Trades from './components/Trades';
import Profile from './components/Profile';
import Nav from './components/Nav';
import React from 'react';

const AuthenticatedApp = () => {
    return (
        <React.Fragment>
            <Nav/>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/trades" element={<Trades/>} />
                <Route path="*" element={<Navigate to="/home"/>}></Route>
            </Routes>
       </React.Fragment>
    );
};

export default AuthenticatedApp;

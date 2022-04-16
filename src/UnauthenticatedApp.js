import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import ConfirmAccount from './components/ConfirmAccount';

const UnauthenticatedApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/createAccount" element={<CreateAccount/>} />
            <Route path="/confirmAccount" element={<ConfirmAccount/>} />
            <Route path="*" element={<Navigate to="/login"/>}></Route>
       </Routes>
    );
};

export default UnauthenticatedApp;

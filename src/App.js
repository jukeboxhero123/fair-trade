import React, { useContext } from 'react';
import { AccountContext } from './contexts/AccountContext';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

export default function App() {

  const { user, isLoading } = useContext(AccountContext);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <React.Fragment>
      {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </React.Fragment>
  )
}

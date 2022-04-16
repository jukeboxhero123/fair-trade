import React, { createContext, useEffect, useState } from 'react'
import Pool from "../UserPool.js"
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from '../graphql/queries/getProfile';
const AccountContext = createContext();

const getSession = async () => {
    return await new Promise((resolve, reject) => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(session);
                }
            })
        } else {
            reject();
        }
    })
}

const useAuth = () => {

    const [user, setUser] = useState();
    const [getUser] = useLazyQuery(
        GET_PROFILE, 
        {
            onCompleted: (data) => {
                setUser(data.getUser);
            }
        }
    );
    

    useEffect(() => {
        getSession()
            .then(session => session.accessToken.payload.sub)
            .then(id => getUser({ variables: { userUuid: id }}))
            .catch((err) => {
                console.log("ERROR AUTHENTICATING:", err);
            });
    }, [getUser])

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool
            });
    
            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });
    
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    getUser({ variables: { userUuid: data.accessToken.payload.sub }})
                    resolve(data);
                },
                onFailure: (err) => {
                    console.err("FAIL", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("NEW PASS REQ", data);
                    resolve(data);
                }
            });
        })
    }

    const logout = () => {
        setUser(null);
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    }

    return {
        user, getSession, logout, authenticate
    }
}

const Account = (props) => {

    const auth = useAuth();

    return (
        <AccountContext.Provider value={auth}>
            {props.children}
        </AccountContext.Provider>
    )
};

export { Account, AccountContext };

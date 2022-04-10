import React, { createContext } from 'react'
import Pool from "../UserPool.js"
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const AccountContext = createContext();

const Account = (props) => {

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
                    console.log("SUCCESS", data);
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
    return (
        <AccountContext.Provider value={{ authenticate, getSession }}>
            {props.children}
        </AccountContext.Provider>
    )
};

export { Account, AccountContext };
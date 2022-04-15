import React from 'react';
import AuthActions from './AuthActions';
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from '../graphql/queries/getProfile';
export default function Landing() {

    const { loading, error, data } = useQuery(GET_PROFILE, {
        variables: { userUuid: localStorage.getItem("user_uuid") },
    });

    console.log(loading, error, data);

    return (
        <div>
            <h1>Fair Trade</h1>
            <AuthActions/>
            { loading ? <div>LOADING</div> : <p>logged in as {data.getUser.email}</p>}
        </div>
    )
}

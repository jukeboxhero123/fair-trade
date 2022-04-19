import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../graphql/queries/getProfile';
export default function Profile() {

    const { loading, error, data } = useQuery(GET_PROFILE, {
        variables: { userUuid: localStorage.getItem("user_uuid") },
    });

    return (
        <div>
            <h1>Your Profile</h1>
            <p>Email: {loading ? '...' : data.getUser.email}</p>
            <p>First Name: {loading ? '...' : data.getUser.first_name}</p>
            <p>Second Name: {loading ? '...' : data.getUser.last_name}</p>  
            <p>Address: {loading ? '...' : data.getUser.address}</p>  
            <p>Bio: {loading ? '...' : data.getUser.bio}</p>   
        </div>
    )
}


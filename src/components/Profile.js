import React, { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { useQuery } from '@apollo/client';
import { GET_USER_ITEMS } from '../graphql/queries/getUserItems';
import Item from './Item';

export default function Profile() {

    const { user } = useContext(AccountContext);
    const { loading, error, data } = useQuery(GET_USER_ITEMS, { variables: { userUuid: user.user_uuid }});
    return (
        <div>
            <h1>Your Profile</h1>
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Second Name: {user.last_name}</p>  
            <p>Address: {user.address}</p>  
            <p>Bio: {user.bio}</p>
            
            <h1>Your Items</h1> 
            <div className="grid grid-cols-5 gap-4">
                {
                    loading 
                        ? "LOADING..." 
                        : error 
                            ? "FAILED TO LOAD ITEMS" 
                            : data.getUserItems.map((item, idx) => <Item item={item} key={idx}></Item>)
                }
            </div>
        </div>
    )
}


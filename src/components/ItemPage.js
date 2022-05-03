import React, { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AccountContext } from '../contexts/AccountContext';
import { useQuery } from '@apollo/client';
import { GET_ITEM } from '../graphql/queries/getItem';

export default function ItemPage() {
  const location = useLocation();
  const { user } = useContext(AccountContext);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ITEM, { variables: { itemUuid: id }});

  return (
    <div>
      {
        loading
          ? "LOADING..."
          : error
            ? "FAILED TO LOAD ITEMS"
            : 
            <div className='grid grid-cols-3 mx-16 my-8'>
              <img height="500px" width="500px" className="rounded-lg" src={data.getItem.image_url} alt=""/>
              <div>
                <p className='text-xl'>{data.getItem.name}</p>
                <br/>
                <p className='text-lg'>{data.getItem.category}</p>
                <br/>    
                <p className='text-base'>{data.getItem.description}</p>                           
                <br/>
                <p className='text-base'>Looking for: {data.getItem.looking_for}</p>    
                <br/>
                <p className='text-base'>Last updated at: {data.getItem.updated_at}</p>  
                <br/>
              </div>
              {
                user.user_uuid !== data.getItem.user_uuid ?
                <Link to="/createTrade" state={{ item: data.getItem }}>
                  <button className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                    Make Offer
                  </button>
                </Link>
                : <></>
              }
            </div>
      }
    </div>
  )
}
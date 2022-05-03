import React, { useState, useContext } from 'react';
import OnboardingPopup from './OnboardingPopup';
import Modal from 'react-modal';
import { AccountContext } from '../contexts/AccountContext';
import Item from './Item';
import { GET_ITEM_PAGINATION } from '../graphql/queries/getItemPagination';
import { useLazyQuery, useQuery } from "@apollo/client";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '500px'
    },
  };

export default function Home() {
    const { user } = useContext(AccountContext);
    const [displayOnboard, setDisplayOnboard] = useState(!user.is_onboarded);
    const [cursor, setCursor] = useState("");
    const [items, setItems] = useState([]);

    useQuery(GET_ITEM_PAGINATION, {
        variables: {
            itemPaginationInput: {
                quantity: 20,
                cursor_type: "updated_at"
            }
        },
        onCompleted: (data) => {
            const { getItemPagination: { items, cursor }} = data;
            setCursor(cursor);
            setItems(items);
        }
    });

    const [loadMoreItems] = useLazyQuery(GET_ITEM_PAGINATION, {
        variables: {
            itemPaginationInput: {
                quantity: 20,
                cursor,
                cursor_type: "updated_at"
            }
        },
    });

    const handleShowMore = async () => {
        const result = await loadMoreItems();
        const { data: { getItemPagination: { items: newItems, cursor } } } = result;
        setItems([...items, ...newItems]);
        setCursor(cursor);
    }

    return (
        <div>
            <h3>Welcome {user.first_name}</h3>
            <h1>Home page: where you can search for items (future recommended page)</h1>
            <Modal isOpen={displayOnboard} style={customStyles} ariaHideApp={false}>
                <OnboardingPopup setDisplayOnboard={setDisplayOnboard}/>
            </Modal>
            <div className="grid grid-cols-5 gap-4 mx-16 my-8"> 
                <div className=""> Search Query Options (In Progress) </div>
                <div className="col-span-4 grid grid-cols-5 gap-4"> 
                    {items.map((item, idx) => <Item item={item} key={idx}></Item>)} 
                </div>
                <div></div>
                <div className="col-span-4 grid place-items-center">
                    {  
                        cursor 
                            ? <button onClick={handleShowMore} className="bg-blue-100 p-1 rounded-md">Show More</button>
                            : ""
                    }
                </div>
            </div>
        </div>
        
    )
}

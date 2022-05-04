import React, { useState, useContext, useEffect } from 'react';
import OnboardingPopup from './OnboardingPopup';
import Modal from 'react-modal';
import { AccountContext } from '../contexts/AccountContext';
import { GlobalContext } from '../contexts/GlobalContext';
import Item from './Item';
import { GET_ITEM_PAGINATION } from '../graphql/queries/getItemPagination';
import { useLazyQuery } from "@apollo/client";

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
    const { categories } = useContext(GlobalContext);
    const [displayOnboard, setDisplayOnboard] = useState(!user.is_onboarded);
    const [cursor, setCursor] = useState("");
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState([]);

    const [loadItems] = useLazyQuery(GET_ITEM_PAGINATION, {
        onCompleted: (data) => {
            const { getItemPagination: { items: newItems, cursor }} = data;
            setItems(newItems);
            setCursor(cursor);
        }
    });

    const [loadMoreItems] = useLazyQuery(GET_ITEM_PAGINATION, {
        onCompleted: (data) => {
            const { getItemPagination: { items: newItems, cursor }} = data;
            setItems([...items, ...newItems]);
            setCursor(cursor);
        }
    });

    const getInput = () => {
        const input = {
            quantity: 20,
            cursor_type: "updated_at"
        }
        if (cursor) input.cursor = cursor;
        if (search) input.search = search;
        return input;
    }

    // Run once when everything renders
    useEffect(() => {
        loadItems({
            variables: {
                itemPaginationInput: {
                    quantity: 20,
                    cursor_type: "updated_at",
                    search: searchQuery,
                    filters: {
                        category: categoryQuery
                    }
                }
            },
        });
    }, [loadItems, searchQuery, categoryQuery]) 

    useEffect(() => {
        const timeOutId = setTimeout(() => setSearchQuery(search), 500);
        return () => clearTimeout(timeOutId);
    }, [search])

    const handleLoadItems = () => {
        loadMoreItems({
            variables: {
                itemPaginationInput: getInput()
            }
        });
    }

    
    function handleCheckboxChange(key) {
        let selections = [...categoryQuery];
        let find = selections.indexOf(key)
        if (find > -1) {
            selections.splice(find, 1);
        } else {
            selections.push(key);
        }

        setCategoryQuery(selections);
    }

    return (
        <div>
            <h3>Welcome {user.first_name}</h3>
            <h1>Home page: where you can search for items (future recommended page)</h1>
            <Modal isOpen={displayOnboard} style={customStyles} ariaHideApp={false}>
                <OnboardingPopup setDisplayOnboard={setDisplayOnboard}/>
            </Modal>
            <div className="grid grid-cols-5 gap-4 mx-16 my-8"> 
                <div className=""> 
                    <h3>Search Query Options</h3>
                    <label>Search</label>
                    <input type="text" className="border" onChange={(e) => { setSearch(e.target.value) }}></input>
                    <label>Categories</label>
                    {
                        categories.map((category) => 
                            <div>
                                <input
                                    type="checkbox"
                                    key={category}
                                    onChange={() => handleCheckboxChange(category)}
                                    selected={categoryQuery.includes(category)}
                                />
                                {category}
                            </div>
                        )
                    }
                </div>
                <div className="col-span-4 grid grid-cols-5 gap-4"> 
                    {items.map((item, idx) => <Item item={item} key={idx}></Item>)} 
                </div>
                <div></div>
                <div className="col-span-4 grid place-items-center">
                    {  
                        cursor 
                            ? <button onClick={handleLoadItems} className="bg-blue-100 p-1 rounded-md">Show More</button>
                            : ""
                    }
                </div>
            </div>
        </div>
        
    )
}

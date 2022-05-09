import React, { useState, useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { useNavigate, useLocation } from 'react-router-dom'
import Item from './Item';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_ITEMS } from '../graphql/queries/getUserItems';
import { CREATE_TRADE } from '../graphql/mutations/createTrade';

export default function CreateTrade() {
  const { user } = useContext(AccountContext);
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();
  
  const [senderItems, setSenderItems] = useState([]);
  const [receiverItems, setReceiverItems] = useState([item]);
  const [allSenderItems, setAllSenderItems] = useState([]);
  const [allReceiverItems, setAllReceiverItems] = useState([]);
  
  const { loading, error } = useQuery(GET_USER_ITEMS, { 
    variables: { userUuid: user.user_uuid }, 
    onCompleted: (data) => {
      setAllSenderItems(data.getUserItems);
    }
  });
  const { loading: otherUserLoading, error: otherUserError } = useQuery(GET_USER_ITEMS, { 
    variables: { userUuid: item.user_uuid },
    onCompleted: (data) => {
      setAllReceiverItems(data.getUserItems.filter((itemObj) => itemObj.item_uuid !== item.item_uuid));
    } 
  });

  const [createTradeMutation] = useMutation(CREATE_TRADE);

  const onClickAllSenderItems = (item) => {
    setSenderItems([...senderItems, item]);
    setAllSenderItems(allSenderItems.filter((itemObj) => itemObj.item_uuid !== item.item_uuid))
  }

  const onClickTradeSenderItems = (item) => {
    setAllSenderItems([...allSenderItems, item]);
    setSenderItems(senderItems.filter((itemObj) => itemObj.item_uuid !== item.item_uuid))
  }

  const onClickAllReceiverItems = (item) => {
    setReceiverItems([...receiverItems, item]);
    setAllReceiverItems(allReceiverItems.filter((itemObj) => itemObj.item_uuid !== item.item_uuid))
  }

  const onClickTradeReceiverItems = (item) => {
    setAllReceiverItems([...allReceiverItems, item]);
    setReceiverItems(receiverItems.filter((itemObj) => itemObj.item_uuid !== item.item_uuid))
  }

  const onClickProposeTrade = async() => {
    await createTradeMutation({
      variables: {
          createTradeInput: {
              "sender_uuid": user.user_uuid,
              "receiver_uuid": item.user_uuid,
              "sender_item_uuids": senderItems.map(({ item_uuid }) => item_uuid),
              "receiver_item_uuids": receiverItems.map(({ item_uuid }) => item_uuid),
              "state": "Pending",
          }
      }
    });
    navigate("../trades");
  }

  return (
    <div className="grid grid-cols-5 gap-4 mx-16 my-8">
      <div>
        <p>My Items</p>
        <div className='overflow-y-auto h-screen'>
          {
            loading
              ? "LOADING..."
              : error
                ? "FAILED TO LOAD ITEMS"
                : allSenderItems.map((item, idx) => <button onClick={() => onClickAllSenderItems(item)}><Item item={item} key={idx} /></button>)
          }
        </div>
      </div>

      <div>
        <p>Items I'm Trading</p>
        <div className='overflow-y-auto h-screen'>
          {senderItems.map((item, idx) => <button onClick={() => onClickTradeSenderItems(item)}><Item item={item} key={idx} /></button>)}
        </div>
      </div>
      
      <div className='stack'>
        <p>TRADING FOR</p>
        <button onClick={onClickProposeTrade} className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Propose Trade
        </button>
      </div>

      <div>
        <p>Items I'm Receiving</p>
        <div className='overflow-y-auto h-screen'>
          {receiverItems.map((item, idx) => <button onClick={() => onClickTradeReceiverItems(item)}><Item item={item} key={idx} /></button>)}
        </div>
      </div>
      
      <div>
        <p>Their Items</p>
        <div className='overflow-y-auto h-screen'>
          {
            otherUserLoading
              ? "LOADING..."
              : otherUserError
                ? "FAILED TO LOAD ITEMS"
                : allReceiverItems.map((item, idx) => <button onClick={() => onClickAllReceiverItems(item)}><Item item={item} key={idx} /></button>)
          }
        </div>
      </div>
    </div>
  )
}
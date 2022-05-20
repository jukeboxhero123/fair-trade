import React, { useState, useContext, useEffect, useRef } from 'react';
import { useLazyQuery, useSubscription, useQuery, useMutation } from '@apollo/client'; 
import { GET_TRADE } from '../graphql/queries/getTrade';
import { AccountContext } from '../contexts/AccountContext';
import { NEW_CHAT } from '../graphql/subscriptions/newChat';
import { GET_TRADE_CHAT } from '../graphql/queries/getTradeChat';
import { SEND_NEW_CHAT } from '../graphql/mutations/newChat';

export default function Chat({trade_uuid, updateTradeStates}) {

    const { user } = useContext(AccountContext);
    const [isReceiver, setIsReceiver] = useState(true);

    const [trade, setTrade] = useState(null);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState("");

    const [loadTrade] = useLazyQuery(GET_TRADE, {
        onCompleted: (data) => {
            const { getTrade } = data;
            setTrade(getTrade);
            if (getTrade.receiver.user_uuid !== user.user_uuid) {
                setIsReceiver(false);
            }
        }
    });
    const [loadTradeChat, { data: tradeChat, loading: loadingTradeChat, error }] = useLazyQuery(GET_TRADE_CHAT, { 
        variables: { 
            tradeUuid: trade_uuid 
        },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setChats(data ? data.getTradeChat.chats : []);
        } 
    });
    const { data, loading } = useSubscription(NEW_CHAT, { 
        variables: { 
            chatUuid: tradeChat?.getTradeChat.chat_uuid
        },
    });

    useEffect(() => {
        if (data) {
            setChats([...chats, data.newChat])
        }
    }, [data, setChats])
        
    useEffect(() => {
        loadTrade({
            variables: { 
                tradeUuid: trade_uuid
            }
        })
        loadTradeChat()
    }, [trade_uuid, loadTrade]);

    const chatEl = useRef(null);


    const scrollToBottom = () => {
        chatEl.current.scrollIntoView({ behavior: "smooth" });
    }
    
    useEffect(() => {
        scrollToBottom();
    })

    const displayTradeInfo = (sender_items, receiver_items, pastTense = false) => {
        const { sender, receiver } = trade;

        const youAreSenderMessage = pastTense ? "You offered" :  "You are offering"
        const youAreReceiverMessage = pastTense ? `${sender.first_name} ${sender.last_name} offered` : `${sender.first_name} ${sender.last_name} is offering`

        return <div>
            <p>{isReceiver ? youAreReceiverMessage : youAreSenderMessage}</p>
            <ul className="list-disc">
                {sender_items.map(item =>
                    <li>{item.name}</li>
                )}
            </ul>
            <p>{isReceiver ? "for your following items" : `for ${receiver.first_name} ${receiver.last_name}'s items`}</p>
            <ul className="list-disc">
                {receiver_items.map(item =>
                    <li>{item.name}</li>
                )}
            </ul>
        </div>
    }

    const [createChatMutation] = useMutation(SEND_NEW_CHAT);
    
    const sendMessage = async (e) => {
        e.preventDefault();
        await createChatMutation({
            variables: {
                createChatInput: {
                    "chat_uuid": tradeChat?.getTradeChat.chat_uuid,
                    "message": message,
                    "sender_uuid": user.user_uuid               
                }
            }
        });
        setMessage("");  
    }

    return (
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2 h-full">
                <div className="overflow-auto h-[calc(100vh-150px)] p-4">
                    { chats.map((chat, idx) => {
                        let style = "bg-slate-200";
                        if (chat.sender_uuid === user.user_uuid) {
                            style = "bg-blue-200";
                        }
                        return <div key={idx} className={style}> {chat.message}</div>
                    }) }   
                    <div 
                        style={{ float:"left", clear: "both" }}
                        ref={chatEl}>
                    </div>  
                </div>
                <div className="border h-[calc(0%+50px)]">
                    <form className="float-left w-[calc(100%-50px)] h-full" onSubmit={sendMessage}>
                        <input type="text" placeholder="Write your message..." className="w-full h-full rounded-md" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                    </form>
                </div>
            </div>
            <div className="h-full">
                <h3>Current Trade</h3>
                { trade 
                    ? displayTradeInfo(trade.sender_items, trade.receiver_items)
                    : "" }

                <br/>
                <h3>Previous Trade</h3>
                { trade?.previous_trade 
                    ? displayTradeInfo(trade.previous_trade.sender_items, trade.previous_trade.receiver_items, true)
                    : ""
                }
                <br/>
                <div className="grid grid-cols-3 gap-4">
                    <button className="border" onClick={() => {
                        updateTradeStates({ variables: {
                            updateStatesInput: {
                                state: "Accepted",
                                trade_uuids: [trade_uuid]
                            }
                        }})
                    }}>Accept</button>
                    <button className="border" onClick={() => {
                        updateTradeStates({ variables: {
                            updateStatesInput: {
                                state: "Declined",
                                trade_uuids: [trade_uuid]
                            }
                        }})
                    }}>Decline</button>
                    <button className="border">Counter Offer</button>
                </div>
            </div>
        </div>
    );
}

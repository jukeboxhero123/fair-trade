import React, { useState, useContext, useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client'; 
import { GET_TRADE } from '../graphql/queries/getTrade';
import { AccountContext } from '../contexts/AccountContext';

export default function Chat({trade_uuid, updateTradeStates}) {

    const { user } = useContext(AccountContext);
    const [isReceiver, setIsReceiver] = useState(true);

    const [trade, setTrade] = useState(null);

    const [loadTrade] = useLazyQuery(GET_TRADE, {
        onCompleted: (data) => {
            const { getTrade } = data;
            setTrade(getTrade);
            if (getTrade.receiver.user_uuid !== user.user_uuid) {
                setIsReceiver(false);
            }
        }
    });

    useEffect(() => {
        loadTrade({
            variables: { 
                tradeUuid: trade_uuid
            }
        })
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

    return (
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2 h-full">
                <div className="overflow-auto h-[calc(100vh-150px)] p-4">
                    {/* { text.concat(text).map((text, idx) => {
                        return <div key={idx} className="">{text.message}</div>
                    }) }    */}
                    <div 
                        style={{ float:"left", clear: "both" }}
                        ref={chatEl}>
                    </div>  
                </div>
                <div className="border h-[calc(0%+50px)]">
                    <form className="float-left w-[calc(100%-50px)] h-full">
                        <input type="text" placeholder="Write your message..." className="w-full h-full rounded-md"></input>
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

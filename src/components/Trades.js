import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_TRADES } from '../graphql/queries/getUserTrades';
import { AccountContext } from '../contexts/AccountContext';
import Chat from './Chat';
import { UPDATE_TRADE_STATES } from '../graphql/mutations/updateTradeStates';

export default function Trades() {

    const { user } = useContext(AccountContext);  
    const [currentTrade, setCurrentTrade] = useState("");

    const { loading, error, data, refetch } = useQuery(GET_USER_TRADES, { 
        variables: { userUuid: user.user_uuid, state: 'Pending' }
    });

    const [updateTradeStates] = useMutation(UPDATE_TRADE_STATES, {
        onCompleted: () => {
            refetch();
        }
    });

    return (
        <div className="m-6 h-[calc(100vh-100px)] border rounded-md">
            <div className="w-fit h-full float-left p-1"> 
                { loading 
                    ? "loading..." 
                    : data.getUserTrades.length 
                        ? data.getUserTrades.map(trade => {
                            let name = "";
                            if (trade.sender.user_uuid !== user.user_uuid) {
                                name = `${trade.sender.first_name} ${trade.sender.last_name}`;
                            } else { 
                                name = `${trade.receiver.first_name} ${trade.receiver.last_name}`; 
                            }

                            let className = "w-72 bg-white w-full h-16 p-1 hover:bg-slate-200 rounded-md m-1";
                            if (currentTrade === trade.trade_uuid) {
                                className += " bg-slate-200";
                            }

                            return <div key={trade.trade_uuid} className={className} onClick={() => {
                                setCurrentTrade(trade.trade_uuid);
                            }}> {name} </div> 
                        })
                        : "No Pending Trades"
                }
            </div>
            <div className="h-full w-full"> 
                { !currentTrade ? "Click on a user on the left to discuss trades!" : <Chat updateTradeStates={updateTradeStates} trade_uuid={currentTrade}/>}
            </div>
        </div>
    )
}

import { gql } from "@apollo/client";

export const GET_TRADE_CHAT = gql`
  query GetTradeChat($tradeUuid: String!) {
    getTradeChat(trade_uuid: $tradeUuid) {
      chat_uuid
      trade_uuid
      chats {
        message
        chat_uuid
        timestamp
        sender_uuid
        trade_uuid
      }
    }
  }
`;

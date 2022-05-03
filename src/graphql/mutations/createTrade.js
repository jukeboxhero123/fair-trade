import { gql } from "@apollo/client";

export const CREATE_TRADE = gql`
  mutation Mutation($createTradeInput: CreateTradeInput!) {
    createTrade(createTradeInput: $createTradeInput) {
        trade_uuid
        sender_uuid
        receiver_uuid
        sender_items
        receiver_items
        state
        trade_history
        created_at
        updated_at
    }
  }
`;

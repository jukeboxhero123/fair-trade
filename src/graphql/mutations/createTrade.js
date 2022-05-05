import { gql } from "@apollo/client";

export const CREATE_TRADE = gql`
  mutation Mutation($createTradeInput: CreateTradeInput!) {
    createTrade(createTradeInput: $createTradeInput) {
        trade_uuid
        sender_uuid
        receiver_uuid
        state
        previous_trade_uuid
        created_at
        updated_at
    }
  }
`;

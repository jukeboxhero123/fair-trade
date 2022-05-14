import { gql } from "@apollo/client";


export const UPDATE_TRADE_STATES = gql`
    mutation Mutation($updateStatesInput: UpdateStatesInput!) {
        updateTradeStates(updateStatesInput: $updateStatesInput) {
            created_at
            trade_uuid
            state
        }
    }
`;

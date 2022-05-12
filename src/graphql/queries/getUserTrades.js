import { gql } from "@apollo/client";

export const GET_USER_TRADES = gql`
    query GetUserTrades($userUuid: String!, $state: String) {
        getUserTrades(user_uuid: $userUuid, state: $state) {
            trade_uuid
            sender_items {
                description
                name
            }
            receiver_items {
                description
                name
            }
            receiver {
                first_name
                last_name
                email
                user_uuid
            }
            sender {
                first_name
                last_name
                email
                user_uuid
            }
            state
        }
    }
`;

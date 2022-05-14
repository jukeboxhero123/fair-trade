import { gql } from "@apollo/client";

export const GET_TRADE = gql`
    query GetTrade($tradeUuid: String!) {
        getTrade(trade_uuid: $tradeUuid) {
        receiver_items {
            category
            created_at
            description
            image_url
            item_uuid
            looking_for
            name
            status
            updated_at
            user_uuid
        }
        sender {
            address
            bio
            created_at
            email
            first_name
            last_name
            updated_at
            user_uuid
            is_onboarded
        }
        sender_items {
            category
            created_at
            description
            image_url
            item_uuid
            looking_for
            name
            status
            updated_at
            user_uuid
        }
        receiver {
            address
            bio
            created_at
            email
            first_name
            is_onboarded
            last_name
            updated_at
            user_uuid
        }
        previous_trade {
            sender_items {
            category
            created_at
            description
            image_url
            item_uuid
            looking_for
            name
            status
            updated_at
            user_uuid
            }
            receiver_items {
            category
            created_at
            description
            image_url
            item_uuid
            name
            looking_for
            status
            updated_at
            user_uuid
            }
        }
        }
    }
`;

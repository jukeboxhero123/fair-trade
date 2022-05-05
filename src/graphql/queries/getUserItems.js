import { gql } from "@apollo/client";

export const GET_USER_ITEMS = gql`
  query Query($userUuid: String!) {
    getUserItems(user_uuid: $userUuid) {
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
      user {
        first_name
        last_name
      }
    }
  }
`;



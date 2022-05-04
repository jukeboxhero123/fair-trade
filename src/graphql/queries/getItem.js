import { gql } from "@apollo/client";

export const GET_ITEM = gql`
  query GetItem($itemUuid: String!) {
    getItem(item_uuid: $itemUuid) {
      item_uuid
      user_uuid
      name
      description
      category
      looking_for
      status
      created_at
      updated_at
      image_url
    }
  }
`;

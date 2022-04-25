import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem($createItemInput: CreateItemInput!) {
    createItem(createItemInput: $createItemInput) {
        created_at
        category
        description
        image_url
        item_uuid
        looking_for
        name
        status
        updated_at
        user_uuid
    }
  }
`;

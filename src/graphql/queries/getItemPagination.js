import { gql } from "@apollo/client";

export const GET_ITEM_PAGINATION = gql`
  query ExampleQuery($itemPaginationInput: ItemPaginationInput!) {
    getItemPagination(itemPaginationInput: $itemPaginationInput) {
        items {
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
        cursor
    }
  }
`;

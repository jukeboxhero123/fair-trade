import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query Query($userUuid: String!) {
    getUser(user_uuid: $userUuid) {
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
  }
`;

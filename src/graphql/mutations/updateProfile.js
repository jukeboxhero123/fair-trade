import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation CreateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
        address
        bio
        email
        first_name
        is_onboarded
        last_name
        user_uuid
    }
  }
`;

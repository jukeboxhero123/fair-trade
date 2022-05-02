import { gql } from "@apollo/client";

export const GET_OPTIONS = gql`
  query Query($name: String!) {
    getOptions(name: $name) {
        name
        options
    }
  }
`;

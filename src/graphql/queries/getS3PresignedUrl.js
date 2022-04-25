import { gql } from "@apollo/client";

export const GET_S3_PRESIGNED_URL = gql`
  query Query {
    getS3PresignedUrl
  }
`;

import { gql } from "@apollo/client";

export const NEW_CHAT = gql`
  subscription NewChat($chatUuid: String!) {
    newChat(chat_uuid: $chatUuid) {
      chat_uuid
      sender_uuid
      message
      timestamp
      trade_uuid
    }
  }
`;

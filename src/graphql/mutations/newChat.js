import { gql } from "@apollo/client";

export const SEND_NEW_CHAT = gql`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      chat_uuid
      message
      sender_uuid
      timestamp
      trade_uuid
    }
  }
`;

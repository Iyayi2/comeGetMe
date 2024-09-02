import Conversation from '@/models/Conversation';

export const destructureConversation = (conversation: Conversation) => {
  const { _id, sessionId, members }       = conversation;
  const { username,   _id: userId }       = members[0];
  const { username: sellerName, product } = members[1];
  const recipient = sessionId === userId ? sellerName : username;

  return { _id, recipient, product }
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Conversation from '@/models/Conversation';
import css from './Messages.module.css';
import LoadingIndicator from '../loading/LoadingIndicator';
import Message from '@/models/Message';

export default function Messages({ conversation }: { conversation: Conversation }) {
  const { _id, sessionId, members } = conversation;
  const { username }             = members[0];
  const { username: sellerName } = members[1];
  const recipient = (userId: string) => (sessionId === userId ? sellerName : username);
  const { sendRequest } = useHTTP();
  const { data: messages, isLoading } = useFetch('message/' + _id);
  const [value, setValue] = useState('');

  console.log('messages', messages);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim()) {
      const message = await sendRequest({
        path: 'message',
        method: 'POST',
        data: { conversationId: _id, text: value },
      });
      message && setValue('');
    }
  }

  return (
    <motion.div
      className={css['messages']}
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 1 } }}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ul>
          {messages && (messages as Message[]).map(({ _id, userId, createdAt, text }) => (
            <li key={_id}>
              <p>{createdAt}</p>
              <p>{recipient(userId)}</p>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={sendMessage}>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <button>send</button>
      </form>
    </motion.div>
  );
}

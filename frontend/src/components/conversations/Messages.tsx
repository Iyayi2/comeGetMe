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
  const { sendRequest } = useHTTP();
  const { data: messages, isLoading } = useFetch('message/' + _id);
  const [value, setValue] = useState('');
  const recipient = (userId: string) => (sessionId === userId ? sellerName : username);

  console.log('messages RENDERED', messages); // logData

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
    <motion.div className={css['messages']} layout>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ul>
          {messages &&
            (messages as Message[]).map(({ _id, userId, createdAt, text }, index) => {
              const isCurrentUser = userId === sessionId;
              return (
                <motion.li
                  key={_id}
                  initial={{ opacity: 0, x: 100 * (isCurrentUser ? -1 : 1) }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 * index } }}
                  style={{ alignSelf: isCurrentUser ? 'start' : 'end' }}
                >
                  <p>{createdAt}</p>
                  <p>{recipient(userId)}</p>
                  <p>{text}</p>
                </motion.li>
              );
            })}
        </ul>
      )}
      <motion.form
        onSubmit={sendMessage}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.5, delay: 1 } }}
      >
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <button>send</button>
      </motion.form>
    </motion.div>
  );
}

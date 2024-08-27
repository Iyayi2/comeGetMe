import { useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Conversation from '@/models/Conversation';
import LoadingIndicator from '../loading/LoadingIndicator';
import Message from '@/models/Message';
import MessageItem from './Message';
import css from './Messages.module.css';

export default function Messages({ conversation }: { conversation: Conversation }) {
  const { _id, sessionId, members } = conversation;
  const { username }             = members[0];
  const { username: sellerName } = members[1];
  const { sendRequest } = useHTTP();
  const { data: messages, isLoading, getData } = useFetch('message/' + _id);
  const [value, setValue] = useState('');
  const isRecipient = (userId: string) => (sessionId === userId ? sellerName : username);

  console.log('messages RENDERED', messages); // logData

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim()) {
      const message = await sendRequest({
          path: 'message',
        method: 'POST',
          data: { conversationId: _id, text: value },
      });
      if (message) {
        setValue('');
        await getData();
      }
    }
  }

  return (
    <motion.div className={css['messages']} layout>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <LayoutGroup>
          <ul>
            {(messages || []).map((message: Message, index) => (
              <MessageItem
                key={message._id}
                message={message}
                index={index}
                activeId={sessionId}
                isRecipient={isRecipient}
              />
            ))}
          </ul>
        </LayoutGroup>
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

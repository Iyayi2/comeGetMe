import { useRef, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Conversation from '@/models/Conversation';
import LoadingIndicator from '../loading/LoadingIndicator';
import Message from '@/models/Message';
import MessageItem from './Message';
import css from './Messages.module.css';

export default function Messages({ conversation }: { conversation: Conversation }) {
  const { _id, sessionId } = conversation;
  const { sendRequest } = useHTTP();
  const { data: messages, isLoading, setData } = useFetch<Message[]>('message/' + _id);
  const [value, setValue] = useState('');
  const msgRef = useRef<HTMLLIElement>(null);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // prettier-ignore
    if (value.trim()) {
      const message = await sendRequest({
          path: 'message',
        method: 'POST',
          data: { conversationId: _id, text: value },
      });
      if (message) {
        setValue('');
        setData((prevData) => (prevData ? [...prevData, message] : [message]));
      }
    }
  }

  const scrollTo = () =>
    messages && messages.length > 0 && msgRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.div className={css['messages']}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <LayoutGroup>
          <ul>
            {(messages || []).map((message: Message, index) => {
              const isLast   = index === (messages || []).length - 1;
              const duration = Math.max(2 - (index * 0.01), 0.2)
              const delay    = Math.min(0.02 * index, 2)

              return (
                <MessageItem
                  key={message._id}
                  ref={isLast ? msgRef : null}
                  message={message}
                  activeId={sessionId}
                  scrollTo={scrollTo}
                  duration={duration}
                  delay={delay}
                />
              );
            })}
          </ul>
        </LayoutGroup>
      )}
      <motion.form
        layout
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

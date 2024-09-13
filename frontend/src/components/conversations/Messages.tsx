import { Context } from '@/store/Context';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Conversation from '@/models/Conversation';
import LoadingIndicator from '../loading/LoadingIndicator';
import Message from '@/models/Message';
import MessageItem from './Message';
import { returnNewMessages } from '@/util/returnNewMessages';
import css from './Messages.module.css';

export default function Messages({ conversation }: { conversation: Conversation }) {
  const { _id, sessionId } = conversation;
  const {              navTo                 } = useContext(Context);
  const {           sendRequest              } = useHTTP();
  const { data: messages, isLoading, setData } = useFetch<Message[]>('message/' + _id);
  const [value,     setValue] = useState('');
  const [didSend, setDidSend] = useState(false);
  const  msgRef               = useRef<HTMLLIElement>(null);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // prettier-ignore
    if (value.trim()) {
      const message = await sendRequest({
        params: 'message',
        method: 'POST',
          data: { conversationId: _id, text: value },
      });
      if (message) {
          setValue('');
           setData((prevData) => (prevData ? [...prevData, message] : [message]));
        setDidSend(true);
      } else {
        navTo('/account'); // if session ends on server
      }
    }
  }

  useEffect(() => {
    const checkForMsgs = async () => {
      const response = await sendRequest({ params: 'message/' + _id, method: 'GET' });
      if (response) {
        const newMsgs = returnNewMessages(messages || [], response);
        if (newMsgs.length > 0) {
          setData((prevData) => (prevData ? [...prevData, ...newMsgs] : [...newMsgs]))
        }
      }
    };

    const interval = setInterval(() => {
      checkForMsgs();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [_id, messages, setData, sendRequest]);

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
              const   isLast = index === (messages || []).length - 1;
              const duration = didSend ? 0.5 : Math.max(1.5 - 0.01 * index, 0.2);
              const    delay = didSend ? 0   : Math.min(      0.02 * index, 1.5);

              return (
                <MessageItem
                        key={message._id}
                        ref={isLast ? msgRef : null}
                    message={message}
                  sessionId={sessionId}
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

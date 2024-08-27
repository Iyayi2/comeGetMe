import { motion } from 'framer-motion';
import css from './Messages.module.css';
import { useHTTP } from '@/hooks/useHTTP';
import Conversation from '@/models/Conversation';
import { useRef } from 'react';

export default function Messages({ conversation }: { conversation: Conversation }) {
  const { _id, sessionId, members } = conversation;
  const { username, _id: userId } = members[0];
  const { username: sellerName, product } = members[1];
  const { sendRequest } = useHTTP();
  const InputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (InputRef.current) {
      const message = await sendRequest({
        path: 'message',
        method: 'POST',
        data: { conversationId: _id, text: InputRef.current.value },
      });
      message && formRef.current && formRef.current.reset();
    }
  }

  return (
    <motion.div
      className={css['messages']}
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 1 } }}
    >
      <span>MESSAGES</span>
      <form ref={formRef} onSubmit={sendMessage}>
        <input ref={InputRef} />
        <button>send</button>
      </form>
    </motion.div>
  );
}

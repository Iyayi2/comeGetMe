import { motion } from 'framer-motion';
import Message from '@/models/Message';
import css from './Message.module.css'

export default function MessageItem({
  message,
  index,
  activeId,
  isRecipient,
}: {
      message: Message;
        index: number;
     activeId: string;
  isRecipient: (id: string) => string;
}) {
  const { createdAt, userId, text } = message;
  const isCurrentUser = userId === activeId;
  const recipient = isRecipient(userId);

  return (
    <motion.li
      className={css['message']}
      layout
      initial={{ opacity: 0, x: 100 * (isCurrentUser ? -1 : 1) }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 * index } }}
      style={{ alignSelf: isCurrentUser ? 'end' : 'start' }}
    >
      <p>{createdAt}</p>
      <p>{recipient}</p>
      <p>{text}</p>
    </motion.li>
  );
}

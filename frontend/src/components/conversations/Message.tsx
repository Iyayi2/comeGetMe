import { motion } from 'framer-motion';
import Message from '@/models/Message';
import formatDate from '@/util/formatDate';
import css from './Message.module.css'

export default function MessageItem({
  message,
  index,
  activeId,
}: {
      message: Message;
        index: number;
     activeId: string;
}) {
  const { createdAt, userId, text } = message;
  const isCurrentUser = userId === activeId;
  const date = formatDate({ date: createdAt, time: true });

  return (
    <motion.li
      className={css['message']}
      layout
      initial={{ opacity: 0, x: 100 * (isCurrentUser ? -1 : 1) }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 * index } }}
      style={{
         alignSelf: isCurrentUser ? 'end' : 'start',
        background: `linear-gradient(to left, ${isCurrentUser ? '#7a984e, #4f6134' : '#366b86, #136087'}`
      }}
    >
      <p>{date}</p>
      <p>{text}</p>
    </motion.li>
  );
}
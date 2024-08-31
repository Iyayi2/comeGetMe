import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Message from '@/models/Message';
import formatDate from '@/util/formatDate';
import css from './Message.module.css';

function MessageItem(
  {
    message,
    sessionId,
    duration,
    delay,
    scrollTo,
  }: { message: Message; sessionId: string; duration: number; delay: number; scrollTo: () => void },
  ref: React.Ref<HTMLLIElement>
) {
  const { createdAt, userId, text } = message;
  const isCurrentUser = userId === sessionId;
  const date = formatDate({ date: createdAt, time: true });

  return (
    <motion.li
      className={css['message']}
      ref={ref}
      layout
      initial={{ opacity: 0, x: 100 * (isCurrentUser ? -1 : 1) }}
      animate={{ opacity: [0, 0, 1], x: 0, transition: { duration, delay } }}
      onAnimationComplete={scrollTo}
      style={{
        alignSelf: isCurrentUser ? 'end' : 'start',
        background: `linear-gradient(to left, ${
          isCurrentUser ? '#7a984e, #4f6134' : '#366b86, #136087'
        }`,
      }}
    >
      <p>{date}</p>
      <p>{text}</p>
    </motion.li>
  );
}

const ForwardedMessageItem = forwardRef(MessageItem);
export default ForwardedMessageItem;

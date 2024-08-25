import { motion } from 'framer-motion';
import Messages from './Messages';
import Conversation from '@/models/Conversation';
import css from './Conversation.module.css';

export default function ConversationItem({
  conversation,
  isActive,
  setActive,
}: {
  conversation: Conversation;
  isActive: Conversation[] | null;
  setActive: (conversation: Conversation[] | null) => void;
}) {
  const { sessionId, members } = conversation;
  const { _id: userId, username } = members[0];
  const { username: sellerName, product } = members[1];
  const recipient = sessionId === userId ? sellerName : username;

  function clickHandler() {
    if (!isActive) {
      setActive([conversation]);
    }
  }

  return (
    <motion.li
      className={css['conversation']}
      style={{ flex: isActive ? 1 : 0, overflowY: isActive ? 'auto' : 'hidden' }}
      layout
      transition={{ layout: { duration: 0.5 } }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
      exit={{ opacity: 0, x: 100 }}
      onClick={clickHandler}
    >
      <section className={css['recipient']}>
        <motion.img layout src={`http://localhost:3000/${product.imageUrl}`} alt={product.title} />
        <div className={css['product']}>
          <motion.h2 layout>{recipient}</motion.h2>
          <motion.p layout>
            <span>{product.title}</span>
            <span>${product.price.toFixed(2)}</span>
          </motion.p>
        </div>
        {isActive && (
          <motion.button layout onClick={() => setActive(null)}>
            Back
          </motion.button>
        )}
      </section>
      {isActive && <Messages />}
    </motion.li>
  );
}

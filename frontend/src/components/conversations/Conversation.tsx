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
  setActive: (conversation: Conversation[]) => void;
}) {
  const { sessionId, members } = conversation;
  const { _id: userId, username } = members[0];
  const { username: sellerName, product } = members[1];
  const recipient = sessionId === userId ? sellerName : username;

  return (
    <motion.li
      className={css['conversation']}
      style={{ flex: isActive ? 1 : 0 }}
      layout
      exit={{ opacity: 0, x: 100 }}
      onClick={() => setActive([conversation])}
    >
      <section className={css['recipient']}>
        <motion.img layout src={`http://localhost:3000/${product.imageUrl}`} alt={product.title} />
        <div>
          <motion.h2 layout>{recipient}</motion.h2>
          <motion.p layout>
            <span>{product.title}</span>
            <span>${product.price.toFixed(2)}</span>
          </motion.p>
        </div>
      </section>
      <Messages />
    </motion.li>
  );
}

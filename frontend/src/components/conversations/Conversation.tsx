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
      layout
      exit={{ opacity: 0, x: 100 }}
      onClick={() => setActive([conversation])}
    >
      <motion.img layout src={`http://localhost:3000/${product.imageUrl}`} alt={product.title} />
      <Messages />
      <div className={css['recipient']}>
        <h2>
          <span>{recipient}</span>
        </h2>
        <p>
          <span>{product.title}</span>
          <span>${product.price.toFixed(2)}</span>
        </p>
      </div>
    </motion.li>
  );
}

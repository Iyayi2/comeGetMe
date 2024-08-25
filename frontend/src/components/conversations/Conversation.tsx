import { AnimatePresence, motion } from 'framer-motion';
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
  const { sessionId, members }            = conversation;
  const { username, _id: userId }         = members[0];
  const { username: sellerName, product } = members[1];
  const recipient = sessionId === userId ? sellerName : username;

  function clickHandler() {
    if (!isActive) {
      setActive([conversation]);
    }
  }

  const height = isActive ? 180 : 120;

  return (
    <motion.li
      className={css['conversation']}
      style={{
        /* Alternate Layout: */
          // flex: isActive ? 1 : 0,        // FLEX-BASED
        height: isActive ? '100%' : '',  // HEIGHT-BASED
        cursor: isActive ? '' : 'pointer',
      }}
      layout
      transition={{ layout: { duration: 0.5 } }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
         exit={{ opacity: 0, x: 100 }}
      onClick={clickHandler}
    >
      <motion.section
        className={css['recipient']}
        layout
        animate={{ height, transition: { delay: 0.1, duration: 0.5 } }}
      >
        <motion.img
          src={`http://localhost:3000/${product.imageUrl}`}
          alt={product.title}
          style={{ borderBottom: isActive ? '1px solid black' : '' }}
          initial={{ width: height, height }}
          animate={{
            width: height,
            height,
            transition: { delay: 0.1, duration: 0.5 },
          }}
        />
        <div className={css['product']}>
          <h2>{recipient}</h2>
          <p>
            <span>{product.title}</span>
            <span>${product.price.toFixed(2)}</span>
          </p>
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
              whileHover={{ backgroundColor: '#000', color: '#FFFFFF' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={() => setActive(null)}
            >
              BACK
            </motion.button>
          )}
        </AnimatePresence>
      </motion.section>
      {isActive && <Messages />}
    </motion.li>
  );
}

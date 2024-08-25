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
  const width = height;
  const transparent = 'linear-gradient(to right, #d4dbe000, #E9E4F000)';

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
      whileHover={{ filter: `brightness(${isActive ? 1 : 0.7})` }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
         exit={{ opacity: 0, x: 100 }}
      onClick={clickHandler}
    >
      <motion.section
        className={css['recipient']}
        layout
        style={{ borderBottom: isActive ? '1px solid black' : '' }}
        initial={{ background: transparent }}
        animate={{
          background: isActive ? 'linear-gradient(to right, #d4dbe0, #E9E4F0)' : transparent,
          transition: { delay: 0.1, duration: 0.5 },
        }}
      >
        <motion.img
          src={`http://localhost:3000/${product.imageUrl}`}
          alt={product.title}
          initial={{ width, height }}
          animate={{ width, height, transition: { delay: 0.1, duration: 0.5 } }}
        />
        <div className={css['product']}>
          <h2>{recipient}</h2>
          <p style={{ fontWeight: isActive ? 400 : 300 }}>
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
              whileHover={{ backgroundColor: '#e4d8f4', color: '#4b4a47', textShadow: 'none' }}
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

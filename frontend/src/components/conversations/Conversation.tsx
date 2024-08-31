import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { Context } from '@/store/Context';
import { mediaQuery } from '@/util/mediaQuery';
import { destructureConversation } from '@/util/destructureConversation';
import Messages from './Messages';
import Conversation from '@/models/Conversation';
import css from './Conversation.module.css';

export default function ConversationItem({
  index,
  conversation,
  isActive,
  setActive,
}: {
         index: number;
  conversation: Conversation;
      isActive: Conversation[] | null;
     setActive: (conversation: Conversation[] | null) => void;
}) {
  const { _id, recipient, product } = destructureConversation(conversation);
  const { isAnimating, navTo, setMetadata } = useContext(Context);
  const [    imageSrc,        setImageSrc ] = useState(`http://localhost:3000/${product.imageUrl}`);
  const isMobile = mediaQuery();

  function expand() {
    if (!isActive) {
      navTo(`/inbox/${_id}`);
      !isAnimating && setMetadata({ title: recipient, description: 'Conversation' });
    }
  }

  function collapse() {
    navTo('/inbox');
    if (!isAnimating) {
      setActive(null);
    }
  }

  const height = (isActive ? 180 : 120) * (isMobile ? 0.5 : 1);
  const  width = height;
  const transparent = 'linear-gradient(to right, #d4dbe000, #E9E4F000)';
  const textShadow  = '-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000';
  const layoutTransition = { layout: { duration: 0.5, type: 'tween', ease: 'linear' } };

  return (
    <motion.li
      className={css['conversation']}
      layout
      style={{ flex: isActive ? 1 : 0, cursor: isActive ? '' : 'pointer' }}
      transition={layoutTransition}
      whileHover={{ filter: `brightness(${isActive ? 1 : 0.7})` }}
      initial={{ opacity: 0, x: 50 * (index % 2 === 0 ? 1 : -1) }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5, ease: 'easeIn' } }}
         exit={{ opacity: 0, x: 100 }}
      onClick={expand}
    >
      <motion.section
        className={css['recipient']}
        layout
        transition={layoutTransition}
        style={{ borderBottom: isActive ? '1px solid black' : '' }}
        initial={{ background: transparent }}
        animate={{
          background: isActive ? 'linear-gradient(to right, #d4dbe0, #E9E4F0)' : transparent,
          transition: { duration: 0.5 },
        }}
      >
        <motion.img
          src={imageSrc}
          alt={product.title}
          initial={{ width, height }}
          animate={{ width, height, transition: { delay: 0.1, duration: 0.5 } }}
          onClick={() => isActive && navTo('/market/' + product._id)}
          onError={() => setImageSrc('/notFound.png')}
          style={{ cursor: isActive ? 'pointer' : '' }}
          whileHover={{ scale: isActive ? 1.05 : 1 }}
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
              whileHover={{ backgroundColor: '#e4d8f4', color: '#f1f1f1', textShadow }}
              transition={layoutTransition}
              onClick={collapse}
            >
              BACK
            </motion.button>
          )}
        </AnimatePresence>
      </motion.section>
      {isActive && <Messages conversation={conversation} />}
    </motion.li>
  );
}

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Conversation from '@/models/Conversation';
import ConversationItem from './Conversation';
import ErrorPage from '../error/Error';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  const [isActive, setIsActive] = useState<Conversation[] | null>(null);
  const [error, setError] = useState(false);
  const { conversationId } = useParams();

  useEffect(() => {
    if (conversationId) {
      const conversation = conversations.find((conv) => conv._id === conversationId);
      if (conversation) {
        setIsActive([conversation]);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [conversations, conversationId]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={css['conversations']}>
      <LayoutGroup>
        <AnimatePresence>
          {(isActive ? isActive : conversations).map((conversation, index) => (
            <ConversationItem
              key={conversation._id}
              index={index}
              conversation={conversation}
              isActive={isActive}
              setActive={setIsActive}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </motion.ul>
  );
}

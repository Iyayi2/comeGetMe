import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Conversation from '@/models/Conversation';
import ConversationItem from './Conversation';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  const [isActive, setIsActive] = useState<Conversation[] | null>(null);
  const { conversationId } = useParams();

  console.log('conversationId', conversationId);

  useEffect(() => {
    if (conversationId) {
      const conversation = conversations.find((conv) => conv._id === conversationId);
      if (conversation) {
        setIsActive([conversation]);
      }
    }
  }, [conversations, conversationId]);

  console.log('isActive', isActive);

  return (
    <ul className={css['conversations']}>
      <LayoutGroup>
        <AnimatePresence>
          {(isActive ? isActive : conversations).map((conversation) => (
            <ConversationItem
              key={conversation._id}
              conversation={conversation}
              isActive={isActive}
              setActive={setIsActive}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </ul>
  );
}

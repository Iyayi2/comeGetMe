import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Conversation from '@/models/Conversation';
import ConversationItem from './Conversation';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  const [isActive, setIsActive] = useState<Conversation[] | null>(null);

  useEffect(() => {
    const conversation = sessionStorage.getItem('conversation');
    console.log('conversation', conversation)
    if (conversation) {
      setIsActive([JSON.parse(conversation)]);
        setTimeout(() => {
          sessionStorage.removeItem('conversation'); // Clear the stored conversation
        }, 1000);
    }
  }, []);

  console.log('isActive', isActive)

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

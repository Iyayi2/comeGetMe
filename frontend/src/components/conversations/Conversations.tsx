import { useContext, useState } from 'react';
import { Context } from '@/store/Context';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Conversation from '@/models/Conversation';
import ConversationItem from './Conversation';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  const { conversation } = useContext(Context);
  const [isActive, setIsActive] = useState<Conversation[] | null>(conversation ? [conversation] : null);

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

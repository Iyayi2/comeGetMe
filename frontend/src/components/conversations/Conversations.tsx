import { Context } from '@/store/Context';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Conversation from '@/models/Conversation';
import ConversationItem from './Conversation';
import Fallback from './Fallback';
import ErrorPage from '../error/Error';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  const [isActive, setIsActive] = useState<Conversation[] | null>(null);
  const [   error,    setError] = useState(false);
  const {   conversationId    } = useParams();
  const { metadata, setMetadata } = useContext(Context);

  useEffect(() => {
    if (conversationId) {
      const conversation = conversations.find((conv) => conv._id === conversationId);
      if (conversation) {
        setIsActive([conversation]);
        const recipient = conversation.members[(conversation.sessionId === conversation.members[0]._id ? 1 : 0)].username
        setMetadata({ title: recipient, description: 'Conversation' })
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [conversations, conversationId, setMetadata]);

  if (error) {
    return <ErrorPage />;
  }

  console.log('CONVERSATIONS RENDERED: metadata', metadata); // logData

  return (
    <LayoutGroup>
      <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={css['conversations']}>
        <AnimatePresence>
          {conversations.length > 0 ? (
            (isActive ? isActive : conversations).map((conversation, index) => (
              <ConversationItem
                         key={conversation._id}
                       index={index}
                conversation={conversation}
                    isActive={isActive}
                   setActive={setIsActive}
              />
            ))
          ) : (
            <Fallback key='fallback' />
          )}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

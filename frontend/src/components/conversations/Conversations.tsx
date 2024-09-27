import { useHTTP } from '@/hooks/useHTTP';
import { Context } from '@/store/Context';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { destructureConversation } from '@/util/destructureConversation';
import { compareArrays } from '@/util/compareArrays';
import Conversation from '@/models/Conversation';
import ConversationItem from './Conversation';
import Fallback from './Fallback';
import ErrorPage from '../error/Error';
import css from './Conversations.module.css';

export default function Conversations({
  conversations,
  setConversations,
}: {
  conversations: Conversation[];
  setConversations: Dispatch<SetStateAction<Conversation[] | null>>;
}) {
  const [isActive, setIsActive] = useState<Conversation[] | null>(null);
  const [   error,    setError] = useState(false);
  const {   conversationId    } = useParams();
  const {     sendRequest     } = useHTTP<Conversation[]>();
  const {     setMetadata     } = useContext(Context);

  useEffect(() => {
    if (conversationId) {
      const conversation = conversations.find((conv) => conv._id === conversationId);
      if (conversation) {
        setIsActive([conversation]);
        const { recipient } = destructureConversation(conversation);
        setMetadata({ title: recipient, description: 'Conversation' })
        setError(false);
      } else {
        setError(true);
      }
    }

    const checkForNewConvos = async () => {
      const response = await sendRequest({ params: 'conversations', method: 'GET' });
      if (response) {
        const newConvos = compareArrays(conversations || [], response);
        if (newConvos.length > 0) {
          setConversations((prevData) => (prevData ? [...newConvos, ...prevData] : [...newConvos]))
        }
      }
    }

    const interval = setInterval(() => {
      checkForNewConvos();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [conversations, conversationId, setMetadata]);

  if (error) {
    return <ErrorPage />;
  }

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

import ConversationItem from './Conversation';
import Conversation from '@/models/Conversation';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  return (
    <div className={css['conversations']}>
      <ul>
        {conversations.map((conversation) => (
          <ConversationItem key={conversation._id} conversation={conversation} />
        ))}
      </ul>
    </div>
  );
}

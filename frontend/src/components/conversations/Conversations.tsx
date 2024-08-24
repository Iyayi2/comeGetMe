import ConversationItem from './Conversation';
import Conversation from '@/models/Conversation';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  return (
    <div className={css['conversations']}>
      <ul>
        {conversations.map(({ _id, sessionId, members }) => (
          <ConversationItem key={_id} user={members[0]} seller={members[1]} sessionId={sessionId} />
        ))}
      </ul>
    </div>
  );
}

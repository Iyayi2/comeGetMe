import ConversationItem from './Conversation';
import Conversation from '@/models/Conversation';
import css from './Conversations.module.css';

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  return (
    <div className={css['conversations']}>
      <ul>
        {conversations.map(({ _id, members }) => {
          const seller = members[1];
          return <ConversationItem key={_id} seller={seller} />;
        })}
      </ul>
    </div>
  );
}

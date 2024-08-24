import Messages from './Messages';
import Conversation from '@/models/Conversation';
import css from './Conversations.module.css'

export default function Conversations({ conversations }: { conversations: Conversation[] }) {
  return (
    <ul className={css['conversations']}>
      {conversations.map(({ _id, members }) => {
        const seller = members[1];
        return <Messages key={_id} seller={seller} />;
      })}
    </ul>
  );
}

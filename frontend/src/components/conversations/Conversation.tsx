import Messages from './Messages';
import Conversation from '@/models/Conversation';
import css from './Conversation.module.css';

export default function ConversationItem({ conversation }: { conversation: Conversation }) {
  const { _id, sessionId, members } = conversation;
  const { _id: userId, username } = members[0];
  const { username: sellerName, product } = members[1];
  const recipient = sessionId === userId ? sellerName : username;

  return (
    <li className={css['conversation']}>
      <img src={`http://localhost:3000/${product.imageUrl}`} alt={product.title} />
      <Messages />
      <div className={css['recipient']}>
        <h2>
          <span>{recipient}</span>
        </h2>
        <p>
          <span>{product.title}</span>
          <span>${product.price.toFixed(2)}</span>
        </p>
      </div>
    </li>
  );
}

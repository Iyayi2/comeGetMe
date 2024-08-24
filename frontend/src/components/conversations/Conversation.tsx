import Messages from './Messages';
import User from '@/models/User';
import Seller from '@/models/Seller';
import css from './Conversation.module.css';

export default function Conversation({
  user,
  seller,
  sessionId,
}: {
       user: User;
     seller: Seller;
  sessionId: string;
}) {
  const { _id, username } = user;
  const { username: sellerName, product } = seller;
  const recipient = sessionId === _id ? sellerName : username;

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

import Seller from '@/models/Seller';
import css from './Conversation.module.css';
import Messages from './Messages';

export default function Conversation({ seller }: { seller: Seller }) {
  const { username, product } = seller;

  return (
    <li className={css['conversation']}>
      <img src={`http://localhost:3000/${product.imageUrl}`} alt={product.title} />
      <Messages />
      <div className={css['seller-info']}>
        <h2>
          <span>{username}</span>
        </h2>
        <p>
          <span>{product.title}</span>
          <span>${product.price.toFixed(2)}</span>
        </p>
      </div>
    </li>
  );
}

import Seller from '@/models/Seller';
import css from './Messages.module.css';

export default function Messages({ seller }: { seller: Seller }) {
  const { username, product } = seller;

  return (
    <li className={css['messages']}>
      <img src={`http://localhost:3000/${product.imageUrl}`} alt={product.title} />
      <div>
        <h2>{username}</h2>
        <p>
          <span>{product.title}</span>
          <span>${product.price.toFixed(2)}</span>
        </p>
      </div>
    </li>
  );
}

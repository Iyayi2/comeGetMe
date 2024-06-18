import Product from '@/models/Product';
import css from './AdDetails.module.css';
import User from '@/models/User';

export default function AdDetails({ user, product }: { user: User | null; product: Product }) {
  const { _id, title, description, price, imageUrl, userId } = product;

  return (
    <section className={css.ad}>
      <div className={css.details}>
        <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
        <h2>{title}</h2>
        <span>{price}</span>
        <p>{description}</p>
      </div>
      <div>
        <p>COLUMN 2</p>
      </div>
    </section>
  );
}

import Product from '@/models/Product';
import css from './AdDetails.module.css';
import User from '@/models/User';

export default function AdDetails({ user, product }: { user: User | null; product: Product }) {
  const { _id, title, description, price, imageUrl, userId } = product;

  return (
    <section className={css.ad}>
      <div className={css.details}>
        <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
        <div className={css.title}>
          <h2>{title}</h2>
          <p>${price.toFixed(2)}</p>
        </div>
        <div className={css.desc}>
          <h2>Description</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className={css.actions}>
        <p>COLUMN 2</p>
      </div>
    </section>
  );
}

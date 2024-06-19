import Product from '@/models/Product';
import css from './AdDetails.module.css';
import User from '@/models/User';

export default function AdDetails({ user, product }: { user: User | null; product: Product }) {
  const { _id, title, description, price, imageUrl, userId } = product;

  return (
    <section className={css.ad}>
      <article className={css.article}>
        <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
        <div>
          <h2>{title}</h2>
          <p>${price.toFixed(2)}</p>
        </div>
        <div>
          <h2>Description</h2>
          <p>{description}</p>
        </div>
      </article>
      <aside className={css.aside}>
        <div>COLUMN 2</div>
      </aside>
    </section>
  );
}

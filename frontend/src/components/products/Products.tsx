import Product from '@/models/Product';
import css from './Products.module.css';

export default function Products({ products }: { products: Product[] }) {
  return (
    <section className={css.products}>
      {products.map(({ _id, title, description, price, imageUrl }) => {
        return (
          <article className={css.product} key={_id}>
            <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
            <div className={css.text}>
              <p>
                ${price.toFixed(2)} ○ {title}
              </p>
              <p style={{ color: '#7a7676'}}>{description}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

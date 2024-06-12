import { AnimatePresence, motion } from 'framer-motion';
import Product from '@/models/Product';
import css from './Products.module.css';

export default function Products({ products }: { products: Product[] }) {
  return (
    <AnimatePresence>
      {products.length > 0 && (
        <motion.section
          className={css.products}
          exit={{ opacity: 0, scale: 0 }}
        >
          <AnimatePresence>
            {products.map(({ _id, title, description, price, imageUrl }, index) => {
              return (
                <motion.article
                  className={css.product}
                  key={_id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'tween', delay: 0.2 * index }}
                >
                  <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
                  <div className={css.text}>
                    <p>
                      ${price.toFixed(2)} ○ {title}
                    </p>
                    <p style={{ color: '#7a7676' }}>{description}</p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

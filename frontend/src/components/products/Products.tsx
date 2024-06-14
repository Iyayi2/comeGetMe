import { AnimatePresence, motion } from 'framer-motion';
import Product from '@/models/Product';
import css from './Products.module.css';

export default function Products({
  products,
  expanded,
}: {
  products: Product[];
  expanded?: boolean | null;
}) {
  return (
    <AnimatePresence>
      {products.length > 0 && (
        <motion.ul className={css.products} exit={{ opacity: 0, scale: 0 }}>
          <AnimatePresence>
            {products.map(({ _id, title, description, price, imageUrl, userId }, index) => {
              return (
                <motion.li
                  className={css.product}
                  key={_id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'tween', delay: 0.2 * index }}
                >
                  <img
                    src={`http://localhost:3000/${imageUrl}`}
                    alt='product'
                    style={{ borderBottom: expanded ? 'none' : '' }}
                  />
                  {expanded && <p className={css.username}>Posted by {userId.username}</p>}
                  <div className={css.text}>
                    <p>
                      ${price.toFixed(2)} ○ {title}
                    </p>
                    <p style={{ color: '#7a7676' }}>{description}</p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <motion.ul
      className={css.products}
      layout
      initial='hidden'
      animate='visible'
      transition={{ staggerChildren: 0.15 }}
    >
      <AnimatePresence>
        {products.map(({ _id, title, description, price, imageUrl, userId }) => {
          return (
            <motion.li
              className={css.product}
              key={_id}
              layout
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ borderColor: '#000', y: -5 }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
              onClick={() => navigate('/market/' + _id)}
            >
              <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
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
  );
}

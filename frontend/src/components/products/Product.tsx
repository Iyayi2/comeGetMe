import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Context } from '@/store/Context';
import Product from '@/models/Product';
import css from './Product.module.css';

export default function ProductItem({
  product,
  isLoggedIn,
}: {
      product: Product;
  isLoggedIn?: boolean | null;
}) {
  const { _id, title, price, description, imageUrl, userId } = product;
  const { navTo, isAnimating, setMetadata } = useContext(Context);

  function clickHandler() {
    navTo('/market/' + _id)
    !isAnimating && setMetadata({ title, description });
  }

  return (
    <motion.li
          layout
       className={css['product']}
        variants={{
          hidden: { opacity: 0, y: -50 },
         visible: { opacity: 1, y:   0 },
        }}
            exit={{ opacity: 0, scale: 0 }}
      whileHover={{ borderColor: '#000', y: -5 }}
      transition={{ ease: 'easeInOut', duration: 0.45, layout: { duration: 0.65 } }}
         onClick={clickHandler}
    >
      <img src={`http://localhost:3000/${imageUrl}`} alt={title} />
      {isLoggedIn && <p className={css['username']}>Posted by {userId.username}</p>}
      <div className={css['details']}>
        <p>
          ${price.toFixed(2)} ○ {title}
        </p>
        <p style={{ color: '#7a7676' }}>{description}</p>
      </div>
    </motion.li>
  );
}

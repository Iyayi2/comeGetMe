import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Product from '@/models/Product';
import css from './Product.module.css';

export default function ProductItem({
  product,
  expanded,
}: {
    product: Product;
  expanded?: boolean | null;
}) {
  const { _id, title, price, description, imageUrl, userId } = product;
  const navigate = useNavigate();

  return (
    <motion.li
      className={css['product']}
      layout
      variants={{
         hidden: { opacity: 0, height: 0,      y: -50 },
        visible: { opacity: 1, height: 'auto', y: 0 },
      }}
           exit={{ opacity: 0, height: 0, scale: 0 }}
      whileHover={{ borderColor: '#000', y: -5 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
      onClick={() => navigate('/market/' + _id)}
    >
      <img src={`http://localhost:3000/${imageUrl}`} alt={title} />
      {expanded && <p className={css['username']}>Posted by {userId.username}</p>}
      <div className={css['details']}>
        <p>
          ${price.toFixed(2)} ○ {title}
        </p>
        <p style={{ color: '#7a7676' }}>{description}</p>
      </div>
    </motion.li>
  );
}

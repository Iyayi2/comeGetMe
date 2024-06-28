import { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <input
          className={css.search}
              value={searchTerm}
           onChange={changeHandler}
        placeholder='Search...'
      />
      <motion.ul
        className={css.products}
        layout
        initial='hidden'
        animate='visible'
        transition={{ staggerChildren: 0.15 }}
      >
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(({ _id, title, description, price, imageUrl, userId }) => {
              return (
                <motion.li
                  className={css.product}
                  key={_id}
                  layout
                  variants={{
                    hidden:  { opacity: 0, y: -50, height: 0 },
                    visible: { opacity: 1, y:   0, height: 'auto' },
                  }}
                  exit={{ opacity: 0, scale: 0, height: 0 }}
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
            })
          ) : (
            <motion.p
              layout
              initial={{ opacity: 0, scale: 0, height: 100 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
                 exit={{ opacity: 0, scale: 0, height: 100 }}
              >
              Nothing Found
            </motion.p>
          )}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

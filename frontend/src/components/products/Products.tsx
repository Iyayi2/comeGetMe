import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Product from '@/models/Product';
import css from './Products.module.css';
import ProductItem from './Product';

export default function Products({
  products,
  expanded,
}: {
   products: Product[];
  expanded?: boolean | null;
}) {
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
          className={css['search']}
              value={searchTerm}
           onChange={changeHandler}
        placeholder='Search...'
      />
      <LayoutGroup>
        <motion.ul
           className={css['products']}
              layout
             initial='hidden'
             animate='visible'
          transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
        >
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem key={product._id} product={product} expanded={expanded} />
              ))
            ) : (
              <motion.p
                       key='fallback'
                    layout
                   initial={{ opacity: 0, scale: 0, x: -350 }}
                   animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                Nothing Found
              </motion.p>
            )}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </>
  );
}

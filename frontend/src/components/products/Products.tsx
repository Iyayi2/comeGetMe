import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Product from '@/models/Product';
import ProductItem from './Product';
import LoadingIndicator from '../loading/LoadingIndicator';
import Fallback from './Fallback';
import css from './Products.module.css';

export default function Products({
  products,
  isLoggedIn,
  hasItems,
  onUserPage,
  isLoading,
}: {
     products: Product[];
  isLoggedIn?: boolean | null;
    hasItems?: boolean | null;
  onUserPage?: boolean | null;
    isLoading: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <LayoutGroup>
      <div className={css['container']}>
        {onUserPage && (
          <motion.h3
                 layout
                   key={hasItems + ''}
               initial={{ opacity: 0, scaleY: 0 }}
               animate={{ opacity: 1, scaleY: 1 }}
            transition={{ layout: { ease: 'easeInOut', duration: 0.65 }}}
          >
            {isLoading ? '...loading' : hasItems ? 'Your Listings' : 'You have no listings'}
          </motion.h3>
        )}
        <motion.input
               layout
            className={css['search']}
                value={searchTerm}
             onChange={changeHandler}
          placeholder='Search...'
          transition={{ layout: { ease: 'easeInOut', duration: 0.65 }}}
        />
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              style={{ height: 325, width: 90, position: 'relative' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1, position: 'absolute' }}
          >
            <LoadingIndicator key='loading' />
          </motion.div>
          ) : (
            <motion.ul
               className={css['products']}
                     key='products'
                 initial='hidden'
                 animate='visible'
              transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
            >
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductItem key={product._id} product={product} isLoggedIn={isLoggedIn} />
                  ))
                ) : (
                  <Fallback key='noSearches' />
                )}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

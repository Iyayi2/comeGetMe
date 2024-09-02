import { useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Product from '@/models/Product';
import ProductItem from './Product';
import LoadingIndicator from '../loading/LoadingIndicator';
import Fallback from './Fallback';
import ErrorPage from '../error/Error';
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
  const timerRef = useRef<number | null>(null);

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setSearchTerm(event.target.value.trim());
    }, 1000);
  };

  return (
    <LayoutGroup>
      {/* keep container size consistent during absolute element transitions */}
      <motion.div layout className={css['container']} style={{ minHeight: onUserPage ? 435 : '' }}>
        {onUserPage && (
          <motion.h3
                 layout
                   key={hasItems + ''}
               initial={{ opacity: 0, scaleY: 0 }}
               animate={{ opacity: 1, scaleY: 1 }}
            transition={{ layout: { ease: 'easeInOut', duration: 0.5 }}}
          >
            {isLoading ? '...loading' : hasItems ? 'Your Listings' : 'You have no listings'}
          </motion.h3>
        )}
        <motion.input
               layout
            className={css['search']}
             disabled={products.length === 0}
             onChange={changeHandler}
          placeholder='Search...'
          transition={{ layout: { ease: 'easeInOut', duration: 0.5 }}}
        />
        <AnimatePresence>
          {isLoading ? (
            <LoadingIndicator key='loading' />
          ) : products.length === 0 ? (
            onUserPage ? (
              <Fallback key='noAds' noAds />
            ) : (
              <ErrorPage key='error' type='market' />
            )
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
      </motion.div>
    </LayoutGroup>
  );
}

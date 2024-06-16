import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Products from '@/components/products/Products';
import User from '@/models/User';
import Product from '@/models/Product';
import LoadingIndicator from '../loading/LoadingIndicator';
import Button from '../button/Button';
import ItemForm from '../form/ItemForm';
import css from './Portal.module.css';
import { useState } from 'react';

export default function Portal({
  user,
  onLogout,
  isLoading,
}: {
  user: User;
  onLogout: () => void;
  isLoading: boolean;
}) {
  const { username, email } = user;
  const { sendRequest } = useHTTP();
  const { data: userItems, setData, isLoading: isFetching } = useFetch<Product[]>('my-product');
  const [expanded, setExpanded] = useState(false)

  const hasItems = userItems && userItems.length > 0;

  const submitHandler = async (data: object) => {
    const newItem = await sendRequest({ path: 'add-product', method: 'POST', data });
    newItem && setData((items: Product[] | null) => (items ? [...items, newItem] : [newItem]));
  };

  return (
    <motion.div
      className={css.portal}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css.row}>
        <div className={css.info}>
          <motion.h2
            initial={{ opacity: 0, x: -100, scaleY: 0 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Welcome {username}
          </motion.h2>
          <p className={css.email}>Your Email: {email}</p>
          <p className={css.email}>Ads Online: {(userItems || []).length}</p>
        </div>
        <div className={css.buttons}>
          <Button onClick={onLogout} isLoading={isLoading} type='logout' />
          <Button onClick={() => setExpanded(toggle => !toggle)} type='new ad' />
        </div>
      </div>
      {expanded && <ItemForm onAddItem={submitHandler} />}
      <motion.h3
        key={hasItems as null}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
      >
        {isFetching ? '...loading' : hasItems ? 'Your Listings' : 'You have no listings'}
      </motion.h3>
      {isFetching ? <LoadingIndicator /> : <Products products={userItems || []} />}
    </motion.div>
  );
}

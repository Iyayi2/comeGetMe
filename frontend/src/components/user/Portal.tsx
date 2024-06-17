import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import User from '@/models/User';
import Product from '@/models/Product';
import Products from '../products/Products';
import LoadingIndicator from '../loading/LoadingIndicator';
import Button from '../button/Button';
import ItemForm from '../form/ItemForm';
import css from './Portal.module.css';

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
  const { sendRequest, isLoading: sendingData, error } = useHTTP();
  const { data: userItems, setData, isLoading: isFetching } = useFetch<Product[]>('my-product');
  const [expanded, setExpanded] = useState(false);

  const hasItems = userItems && userItems.length > 0;

  const submitHandler = async (data: object) => {
    const newItem = await sendRequest({ path: 'add-product', method: 'POST', data });
    if (newItem) {
      setData((items: Product[] | null) => (items ? [...items, newItem] : [newItem]));
      setExpanded(false);
    }
  };

  return (
    <motion.div className={css.portal} initial={{ height: 0 }} animate={{ height: 'auto' }}>
      <div className={css.row}>
        <div className={css.info}>
          <motion.h2
            initial={{ opacity: 0, x: -100, scaleY: 0 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Welcome {username}
          </motion.h2>
          <p>Your Email: {email}</p>
          <p>Ads Online: {(userItems || []).length}</p>
        </div>
        <div className={css.buttons}>
          <Button
            text='logout'
            style={{ background: '#cd4f25' }}
            onClick={onLogout}
            isLoading={isLoading}
          />
          <Button
            text={expanded ? 'cancel' : 'new ad'}
            style={{ background: expanded ? '#747272' : '#538392' }}
            onClick={() => setExpanded((toggle) => !toggle)}
          />
        </div>
      </div>
      <ItemForm
        expanded={expanded}
        onAddItem={submitHandler}
        isLoading={sendingData}
        error={error}
      />
      <motion.h3
        key={hasItems as null}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        style={{ marginBottom: hasItems ? '0' : '' }}
      >
        {isFetching ? '...loading' : hasItems ? 'Your Listings' : 'You have no listings'}
      </motion.h3>
      {isFetching ? (
        <LoadingIndicator style={{ margin: '0 0 5rem' }} />
      ) : (
        <Products products={userItems || []} />
      )}
    </motion.div>
  );
}

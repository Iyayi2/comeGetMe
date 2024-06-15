import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Products from '@/components/products/Products';
import User from '@/models/User';
import LoadingIndicator from '../loading/LoadingIndicator';
import Button from '../button/Button';
import AddItemForm from '../form/AddItemForm';
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
  const { data: userItems, setData, isLoading: isFetching } = useFetch('my-product');
  const { sendRequest } = useHTTP();
  const hasItems = userItems && (userItems as []).length > 0;

  const submitHandler = async (data: object) => {
    const newItem = await sendRequest({ path: 'add-product', method: 'POST', data });
    newItem && setData((items) => [...items, newItem]);
  };

  return (
    <motion.div
      className={css.portal}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -100, scaleY: 0 }}
        animate={{ opacity: 1, x: 0, scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Welcome {username}
      </motion.h2>
      <p className={css.email}>Your Email: {email}</p>
      <motion.h3
        key={hasItems}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
      >
        {isFetching ? '...loading' : hasItems ? 'Your Listings' : 'You have no listings'}
      </motion.h3>
      {isFetching ? <LoadingIndicator /> : <Products products={userItems || []} />}
      <AddItemForm onAddItem={submitHandler} />
      <Button onClick={onLogout} isLoading={isLoading} type='logout' />
    </motion.div>
  );
}

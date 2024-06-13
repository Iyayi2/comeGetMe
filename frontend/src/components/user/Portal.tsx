import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import Products from '@/components/products/Products';
import User from '@/models/User';
import LoadingIndicator from '../loading/LoadingIndicator';
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
  const { username, email, _id } = user;
  const { data: userItems, isLoading: isFetching } = useFetch('products/' + _id);

  return (
    <motion.div
      className={css.portal}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p>
        {username} {email}
      </p>
      {isFetching ? <LoadingIndicator /> : <Products products={userItems || []} />}
      <button onClick={onLogout}>{isLoading ? 'sending...' : 'logout'}</button>
    </motion.div>
  );
}

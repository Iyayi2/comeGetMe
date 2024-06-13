import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import Products from '@/components/products/Products';
import Product from '@/models/Product';
import User from '@/models/User';

export default function Portal({
  user,
  onLogout,
  isLoading,
}: {
  user: User;
  onLogout: () => void;
  isLoading: boolean;
}) {
  const { data: products } = useFetch('products');
  const { username, email, _id } = user;
  const userItems = (products || []).filter((item: Product) => item.userId === _id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p>
        {username} {email}
      </p>
      <Products products={userItems} />
      <button onClick={onLogout}>{isLoading ? 'sending...' : 'logout'}</button>
    </motion.div>
  );
}

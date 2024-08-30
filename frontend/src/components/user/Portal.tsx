import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import User from '@/models/User';
import Product from '@/models/Product';
import Products from '../products/Products';
import ItemForm from '../form/ItemForm';
import css from './Portal.module.css';
import UserInfo from './UserInfo';

export default function Portal({
  user,
  onLogout,
  isLoading,
}: {
  user: User;
  onLogout: () => void;
  isLoading: boolean;
}) {
  const { sendRequest, isLoading: sendingData, error } = useHTTP();
  const { data: userItems, setData, isLoading: isFetching } = useFetch<Product[]>('my-products');
  const [expanded, setExpanded] = useState(false);

  const hasItems = userItems && userItems.length > 0;

  const submitHandler = async (data: object) => {
    const newItem = await sendRequest({ params: 'add-product', method: 'POST', data });
    if (newItem) {
      setExpanded(false);
      setTimeout(() => {
        setData((items) => (items ? [...items, newItem] : [newItem]));
      }, 500);
    }
  };

  return (
    <motion.div
      className={css.portal}
      initial={{ y: -100 }}
      animate={{ y: 0, transition: { ease: 'easeIn', duration: 0.5 } }}
    >
      <UserInfo
           expanded={expanded}
        setExpanded={setExpanded}
               user={user}
           onLogout={onLogout}
          isLoading={isLoading}
          adsOnline={(userItems || []).length}
      />
      <ItemForm
         expanded={expanded}
           dataFn={submitHandler}
        isLoading={sendingData}
            error={error}
      />
      <Products
        onUserPage
          products={userItems || []}
          hasItems={hasItems}
         isLoading={isFetching}
      />
    </motion.div>
  );
}

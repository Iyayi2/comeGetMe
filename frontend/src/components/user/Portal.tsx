import { useState } from 'react';
import {   motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import {  useHTTP } from '@/hooks/useHTTP';
import       User   from '@/models/User';
import    Product   from '@/models/Product';
import   UserInfo   from './UserInfo';
import   ItemForm   from '../form/ItemForm';
import   Products   from '../products/Products';
import        css   from './Portal.module.css';

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
  const { data, setData, isLoading: isFetching } = useFetch<Product[]>('my-products');
  const [expanded, setExpanded] = useState(false);

  const products = data || [];
  const hasItems = products.length > 0;

  const submitHandler = async (data: object) => {
    const newItem = await sendRequest({ params: 'add-product', method: 'POST', data });
    if (newItem) {
      setExpanded(false);
      setTimeout(() => {
        setData((items) => (items ? [...items, newItem] : [newItem]));
      }, 500);
    }
  };

  const userInfoProps = { expanded, setExpanded, isLoading, user, onLogout, adsOnline: products.length };
  const itemFormProps = { expanded,       error, isLoading: sendingData, dataFn: submitHandler         };
  const productsProps = { hasItems,    products, isLoading:  isFetching                                };

  return (
    <motion.div
      className={css['portal']}
        initial={{ y: -100 }}
        animate={{ y: 0, transition: { ease: 'easeIn', duration: 0.5 } }}
    >
      <UserInfo  {...userInfoProps} />
      <ItemForm  {...itemFormProps} />
      <Products  {...productsProps} onUserPage />
    </motion.div>
  );
}

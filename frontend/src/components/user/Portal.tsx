import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import { Context } from '@/store/Context';
import User from '@/models/User';
import Product from '@/models/Product';
import Products from '../products/Products';
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
  const { data: userItems, setData, isLoading: isFetching } = useFetch<Product[]>('my-products');
  const [expanded, setExpanded] = useState(false);
  const { navTo } = useContext(Context);

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
      <section>
        <div className={css.info}>
          <motion.h2
            initial={{ opacity: 0, x: -100, scaleY: 0 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Welcome {username}
          </motion.h2>
          <p>
            <FontAwesomeIcon icon='envelope' /> Your Email: {email}
          </p>
          <p>
            <FontAwesomeIcon icon='signs-post' /> Ads Online: {(userItems || []).length}
          </p>
        </div>
        <div className={css.buttons}>
          <Button
            text='logout'
            style={{ background: '#cd4f25' }}
            onClick={onLogout}
            isLoading={isLoading}
          />
          <Button
            text={'inbox'}
            style={{ background: '#94ca7c' }}
            onClick={() => navTo('/inbox')}
          />
          <Button
            text={expanded ? 'cancel' : 'new ad'}
            style={{ background: expanded ? '#747272' : '#538392' }}
            onClick={() => setExpanded((toggle) => !toggle)}
          />
        </div>
      </section>

      <ItemForm expanded={expanded} dataFn={submitHandler} isLoading={sendingData} error={error} />
      <Products onUserPage products={userItems || []} hasItems={hasItems} isLoading={isFetching} />
    </motion.div>
  );
}

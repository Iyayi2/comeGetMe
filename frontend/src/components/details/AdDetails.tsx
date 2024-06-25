import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ItemForm from '../form/ItemForm';
import Product from '@/models/Product';
import User from '@/models/User';
import { APIError } from '@/hooks/useHTTP';
import css from './AdDetails.module.css';
import Button from '../button/Button';

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className={css.box}>{children}</div>
);

export default function AdDetails({
  user,
  product,
  onEdit,
  onDelete,
  isLoading,
  error,
  expanded,
  toggleForm,
}: {
       user: User | null;
    product: Product;
     onEdit: (data: object) => void;
   onDelete: () => void;
  isLoading: boolean;
      error: APIError;
   expanded: boolean;
 toggleForm: () => void;
}) {
  const { _id, title, description, price, imageUrl, userId } = product;
  const myAd = user?._id === userId._id;
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);

  function clickHandler() {
    if (!user) {
      navigate('/account');
    } else if (myAd) {
      toggleForm();
    } else {
      console.log('SEND MESSAGE');
    }
  }

  function confirmHandler() {
    setConfirmation((toggle) => !toggle);
  }

  function deleteHandler() {
    onDelete();
    navigate('/account');
  }

  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y:   0 },
       exit: { opacity: 0, y:  10 },
  };

  return (
    <section className={css.ad}>
      <article className={css.article}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.img
            key={imageUrl}
            initial={{ opacity: 0, height: 0,      width: 0      }}
            animate={{ opacity: 1, height: 'auto', width: 'auto' }}
               exit={{ opacity: 0, height: 0,      width: 0      }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            src={`http://localhost:3000/${imageUrl}`}
            alt='product'
          />
        </AnimatePresence>
        <Box>
          <AnimatePresence mode='wait' initial={false}>
            <motion.h2 key={title} {...animationProps}>
              {title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode='wait' initial={false}>
            <motion.p key={price} {...animationProps}>
              ${price.toFixed(2)}
            </motion.p>
          </AnimatePresence>
        </Box>
        <Box>
          <h2>Description</h2>
          <AnimatePresence mode='wait' initial={false}>
            <motion.p key={description} {...animationProps}>
              {description}
            </motion.p>
          </AnimatePresence>
        </Box>
      </article>
      <aside className={css.aside}>
        <Box>
          <p>
            <span>Ad ID</span>
            <span>{_id}</span>
          </p>
          {user && <p>{myAd ? 'Manage your Ad' : 'Posted by ' + userId.username}</p>}
          <button onClick={clickHandler}>{myAd ? 'Edit Listing' : 'Send Message'}</button>
          {myAd && (
            <AnimatePresence mode='wait' initial={false}>
              {!confirmation ? (
                <motion.button
                  type='button'
                  key={'a' + confirmation}
                  onClick={confirmHandler}
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                     exit={{ opacity: 0, scaleX: 0.5 }}
                  transition={{ duration: 0.2, type: 'tween', ease: 'linear'}}
                >
                  Delete Listing
                </motion.button>
              ) : (
                <motion.div
                  className={css['confirm-dialog']}
                  key={'b' + confirmation}
                  initial={{ opacity: 0, x: -100, height: 0 }}
                  animate={{ opacity: 1, x:    0, height: 'auto' }}
                     exit={{ opacity: 0, x:  100, height: 35 }}
                >
                  <h5>Are you sure you want to delete the listing?</h5>
                  <div>
                    <Button
                      text='Delete'
                      onClick={deleteHandler}
                      style={{ background: '#d04121cd' }}
                    />
                    <Button
                      text='Cancel'
                      onClick={confirmHandler}
                      style={{ background: '#457bdfb7' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </Box>
        <ItemForm
          expanded={expanded}
            dataFn={onEdit}
         isLoading={isLoading}
             error={error}
           product={product}
        />
        <Box>Hello</Box>
      </aside>
    </section>
  );
}

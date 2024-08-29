import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APIError, useHTTP } from '@/hooks/useHTTP';
import { useContext } from 'react';
import { Context } from '@/store/Context';
import ItemForm from '../form/ItemForm';
import DeletePrompt from './DeletePrompt';
import Product from '@/models/Product';
import User from '@/models/User';
import css from './ProductIdDetails.module.css';

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className={css.box}>{children}</div>
);

const GitLink = ({ link, name }: { link: string; name: string }) => (
  <p>
    <FontAwesomeIcon icon={['fab', 'github']} />
    <a href={`https://github.com/${link}`} target='_blank' rel='noopener noreferrer'>
      {name}
    </a>
  </p>
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
  const { navTo } = useContext(Context)
  const { sendRequest } = useHTTP();

  async function clickHandler() {
    if (!user) {
      navTo('/account');
    } else if (myAd) {
      toggleForm();
    } else {
      const conversation = await sendRequest({
        params: `conversation/${userId._id}/${_id}`,
        method: 'GET',
      });
      if (conversation) {
        navTo('/inbox/' + conversation._id);
      } else {
        const newConversation = await sendRequest({
          params: 'conversation',
          method: 'POST',
          data: {
            seller: {
              _id: userId._id,
              username: userId.username,
              product: { _id, title, price, imageUrl },
            },
          },
        });
        if (newConversation) {
          navTo('/inbox/' + newConversation._id);
        }
      }
    }
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
          {myAd && <DeletePrompt onDelete={onDelete} />}
        </Box>
        <ItemForm
          expanded={expanded}
            dataFn={onEdit}
         isLoading={isLoading}
             error={error}
           product={product}
        />
        <Box>
          <GitLink link='Iyayi2'        name='Iyayi Roland' />
          <GitLink link='thegroosalugg' name='Victor Loginov' />
        </Box>
      </aside>
    </section>
  );
}
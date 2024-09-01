import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APIError, useHTTP } from '@/hooks/useHTTP';
import { forwardRef, useContext, useRef } from 'react';
import { Context } from '@/store/Context';
import ItemForm from '../form/ItemForm';
import DeletePrompt from './DeletePrompt';
import Product from '@/models/Product';
import User from '@/models/User';
import css from './ProductIdDetails.module.css';

const Box = forwardRef(
  ({ children }: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => (
    <motion.div ref={ref} layout className={css.box}>
      {children}
    </motion.div>
  )
);

const GitLink = ({ link, name }: { link: string; name: string }) => (
  <p>
    <FontAwesomeIcon icon={['fab', 'github']} />
    <a href={`https://github.com/${link}`} target='_blank' rel='noopener noreferrer'>
      {name}
    </a>
  </p>
);

export default function ProductIdDetails({
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
  toggleForm: (ref: React.RefObject<HTMLElement>) => void;
}) {
  const { _id, title, description, price, imageUrl, userId } = product;
  const myAd = user?._id === userId._id;
  const {    navTo    } = useContext(Context);
  const { sendRequest } = useHTTP();
  const  scrollDownRef  = useRef(null);
  const    scrollUpRef  = useRef(null);

  async function clickHandler() {
    if (!user) {
      navTo('/account');
    } else if (myAd) {
      toggleForm(expanded ? scrollUpRef : scrollDownRef);
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
    <LayoutGroup>
      <section className={css.ad}>
        <LayoutGroup>
          <motion.article layout className={css.article} ref={scrollUpRef}>
            <AnimatePresence mode='wait' initial={false}>
              <motion.img
                    layout
                       key={imageUrl}
                       src={`http://localhost:3000/${imageUrl}`}
                       alt='product'
                   initial={{ opacity: 0, height: 0,      maxWidth: 0      }}
                   animate={{ opacity: 1, height: 'auto', maxWidth: '100%' }}
                      exit={{ opacity: 0, height: 0,      maxWidth: 0      }}
                transition={{   ease: 'linear', duration: 0.7, delay: 0.9  }}
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
          </motion.article>
        </LayoutGroup>
        <LayoutGroup>
          <aside className={css.aside}>
            <Box>
              <p>
                <span>Ad ID</span>
                <span>{_id}</span>
              </p>
              {user &&                    <p>{myAd ? 'Manage your Ad' : 'Posted by ' + userId.username}</p>}
              <button onClick={clickHandler}>{myAd ?   'Edit Listing' : 'Send Message'}</button>
              {myAd && <DeletePrompt onDelete={onDelete} />}
            </Box>
            <ItemForm
               expanded={expanded}
                 dataFn={onEdit}
              isLoading={isLoading}
                  error={error}
                product={product}
            />
            <Box ref={scrollDownRef}>
              <GitLink name='Iyayi Roland'   link='Iyayi2'        />
              <GitLink name='Victor Loginov' link='thegroosalugg' />
            </Box>
          </aside>
        </LayoutGroup>
      </section>
    </LayoutGroup>
  );
}

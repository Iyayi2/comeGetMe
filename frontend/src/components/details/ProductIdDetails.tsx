import { LayoutGroup, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHTTP } from '@/hooks/useHTTP';
import { forwardRef, useContext, useRef } from 'react';
import { Context } from '@/store/Context';
import ItemForm from '../form/ItemForm';
import Article from './Article';
import DeletePrompt from './DeletePrompt';
import Product from '@/models/Product';
import User from '@/models/User';
import css from './ProductIdDetails.module.css';

export const Box = forwardRef(
  ({ children }: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => (
    <motion.section
      layout
         ref={ref}
       style={{ padding: '0.8rem', borderRadius: 3, background: '#ffffff' }}
    >
      {children}
    </motion.section>
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
       error: object | null;
    expanded: boolean;
  toggleForm: (ref: React.RefObject<HTMLElement>) => void;
}) {
  const { _id, title, price, imageUrl, userId } = product;
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

  return (
    <LayoutGroup>
      <section className={css['container']}>
        <LayoutGroup>
          <Article product={product} ref={scrollUpRef} />
        </LayoutGroup>
        <LayoutGroup>
          <aside className={css['aside']}>
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

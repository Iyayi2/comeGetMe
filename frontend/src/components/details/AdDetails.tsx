import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../form/ItemForm';
import Product from '@/models/Product';
import User from '@/models/User';
import { APIError } from '@/hooks/useHTTP';
import css from './AdDetails.module.css';

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
}: {
       user: User | null;
    product: Product;
     onEdit: (data: object) => void;
   onDelete: () => void;
  isLoading: boolean;
      error: APIError;
}) {
  const { _id, title, description, price, imageUrl, userId } = product;
  const myAd = user?._id === userId._id;
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  function clickHandler() {
    if (!user) {
      navigate('/account');
    } else if (myAd) {
      setExpanded((toggle) => !toggle);
    } else {
      console.log('SEND MESSAGE');
    }
  }

  function deleteHandler() {
    onDelete();
    navigate('/account');
  }

  return (
    <section className={css.ad}>
      <article className={css.article}>
        <img src={`http://localhost:3000/${imageUrl}`} alt='product' />
        <Box>
          <h2>{title}</h2>
          <p>${price.toFixed(2)}</p>
        </Box>
        <Box>
          <h2>Description</h2>
          <p>{description}</p>
        </Box>
      </article>
      <aside className={css.aside}>
        <Box>
          <p>Ad ID {_id}</p>
          {user && <p>Posted by {userId.username}</p>}
          <button onClick={clickHandler}>{myAd ? 'Edit Listing' : 'Send Message'}</button>
          {myAd && (
            <button type='button' onClick={deleteHandler}>
              Delete Listing
            </button>
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

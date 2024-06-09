import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/form/Form';
import { RootState } from '@/store/types';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import Product from '@/models/Product';
import { logout } from '@/store/userSlice';
import { fetchData } from '@/util/fetchData';

export default function UserPage() {
  const { loggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const items = useFetch('products');
  const userItems = items.filter((item: Product) => item.userId === loggedIn?._id);

  console.log('[user]', loggedIn, '\n\n', '[user items]', userItems);

  const content = loggedIn ? (
    <>
      <Products products={userItems} />
      <button onClick={() => fetchData({ path: 'login', method: 'GET' })}>check login</button>
      <button onClick={() => fetchData({ path: 'logout', method: 'POST' })}>check logout</button>
      <button onClick={() => dispatch(logout())}>logout</button>
    </>
  ) : (
    <Form />
  );

  return content;
}

import Form from '../components/form/Form';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import Product from '@/models/Product';
import User from '@/models/User';
import { fetchData } from '@/util/fetchData';

export default function UserPage() {
  const items = useFetch('products');
  const data = useFetch('login');

  console.log('[data]', data); // logData

  let content;

  if (data.user) {
    const userItems = items.filter((item: Product) => item.userId === data.user!._id);
    console.log('[user items]', userItems); // logData

    content = (
      <>
        <Products products={userItems} />
        <button onClick={() => fetchData({ path: 'login', method: 'GET' })}>check login</button>
        <button onClick={() => fetchData({ path: 'logout', method: 'POST' })}>check logout</button>
      </>
    );
  } else {
    content = <Form />;
  }

  return content;
}

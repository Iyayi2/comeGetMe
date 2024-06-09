import Form from '../components/form/Form';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import { fetchData } from '@/util/fetchData';
import Product from '@/models/Product';
import User from '@/models/User';

interface ResData {
  user?: User;
  message?: string;
}

export default function UserPage() {
  const items = useFetch('products', []) as Product[];
  const { user, message } = useFetch('login', {}) as ResData;
  console.log('[data]', user, message); // logData

  let content;

  if (user) {
    const userItems = items.filter((item: Product) => item.userId === user._id);
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

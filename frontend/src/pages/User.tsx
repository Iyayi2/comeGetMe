import Form from '../components/form/Form';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import Product from '@/models/Product';
import User from '@/models/User';
import { useHTTP } from '@/hooks/useHTTP';

interface ResData {
  user?: User;
  message?: string;
}

export default function UserPage() {
  const items = useFetch('products', []) as Product[];
  const { user } = useFetch('login', {}) as ResData;
  const { isLoading, sendRequest } = useHTTP();

  let content;

  if (user) {
    const userItems = items.filter((item: Product) => item.userId === user._id);

    content = (
      <>
        <Products products={userItems} />
        <button onClick={() => sendRequest({ path: 'login', method: 'GET' })}>{isLoading ? 'sending...' : 'check login'}</button>
        <button onClick={() => sendRequest({ path: 'logout', method: 'POST' })}>{isLoading ? 'sending...' : 'check logout'}</button>
      </>
    );
  } else {
    content = <Form />;
  }

  return content;
}

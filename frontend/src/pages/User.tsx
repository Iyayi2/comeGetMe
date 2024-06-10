import Form from '../components/form/Form';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import Product from '@/models/Product';
import User from '@/models/User';
import { useHTTP } from '@/hooks/useHTTP';

export default function UserPage() {
  const { data: products } = useFetch('products');
  const { data: user } = useFetch('login');
  const { isLoading, sendRequest } = useHTTP();

  let content;

  if (user) {
    const userItems = (products || []).filter((item: Product) => item.userId === (user as User)._id);

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

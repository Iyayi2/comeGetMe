import Form from '../components/form/Form';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import Product from '@/models/Product';
import User from '@/models/User';
import { useHTTP } from '@/hooks/useHTTP';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const { data: products } = useFetch('products');
  const { data: user } = useFetch('login');
  const { isLoading, sendRequest } = useHTTP();
  const [isLoggedIn, setIsLoggedIn] = useState(user);

  useEffect(() => {
    setIsLoggedIn(user);
  }, [user]);

  let content;

  const handleLogout = async () => {
    await sendRequest({ path: 'logout', method: 'POST' });
    setIsLoggedIn(null);
  };

  if (isLoggedIn) {
    const userItems = (products || []).filter((item: Product) => item.userId === (isLoggedIn as User)._id);

    content = (
      <>
        <Products products={userItems} />
        <button onClick={() => sendRequest({ path: 'login', method: 'GET' })}>{isLoading ? 'sending...' : 'check login'}</button>
        <button onClick={handleLogout}>{isLoading ? 'sending...' : 'check logout'}</button>
      </>
    );
  } else {
    content = <Form />;
  }

  return content;
}

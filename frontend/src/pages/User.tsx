import Form from '../components/form/Form';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';
import Product from '@/models/Product';
import User from '@/models/User';
import { useHTTP } from '@/hooks/useHTTP';
import { useEffect } from 'react';

export default function UserPage() {
  const { data: products } = useFetch('products');
  const { data: user } = useFetch('login');
  const { data: isLoggedIn, setData, isLoading, error, sendRequest } = useHTTP();

  useEffect(() => {
    setData(user);
  }, [user, setData]);

  let content;

  const handleLogin = async (path: string, data: object) => {
    await sendRequest({ path, method: 'POST', data })
  };

  const handleLogout = async () => {
    await sendRequest({ path: 'logout', method: 'POST' });
  };

  console.log('isLoggedIn', isLoggedIn, '\n\n', 'fetchedUser', user); // logData

  if (isLoggedIn) {
    const { username, email, _id } = isLoggedIn as User
    const userItems = (products || []).filter((item: Product) => item.userId === _id);

    content = (
      <>
        <p>{username} {email}</p>
        <Products products={userItems} />
        <button onClick={() => sendRequest({ path: 'login', method: 'GET' })}>{isLoading ? 'sending...' : 'check login'}</button>
        <button onClick={handleLogout}>{isLoading ? 'sending...' : 'check logout'}</button>
      </>
    );
  } else {
    content = <Form isLoading={isLoading} error={error as string} onLogin={handleLogin} />;
  }

  return content;
}

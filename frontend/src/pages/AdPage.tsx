import AdDetails from '@/components/details/AdDetails';
import ErrorPage from '@/components/error/Error';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import { useParams } from 'react-router-dom';

export default function AdPage() {
  const { productId }   = useParams();
  const { data: product, setData, sendRequest, error } = useHTTP();
  const { isLoading }   = useFetch('product/' + productId, setData);
  const { data: user }  = useFetch('login');

  if (!product) {
    return <ErrorPage />;
  }

  console.log('CURRENT USER', user)

  const updateItem = async (data: object) => {
    await sendRequest({ path: 'edit-product/' + productId, method: 'PUT', data });
  };

  return <AdDetails user={user} product={product} onEdit={updateItem} error={error} />;
}

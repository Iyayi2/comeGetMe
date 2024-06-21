import AdDetails from '@/components/details/AdDetails';
import ErrorPage from '@/components/error/Error';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import { useParams } from 'react-router-dom';

export default function AdPage() {
  const { productId }          = useParams();
  const { data: product }      = useFetch('product/' + productId);
  const { data: user }         = useFetch('login');
  const { sendRequest, error } = useHTTP();

  if (!product) {
    return <ErrorPage />;
  }

  const updateItem = async (data: object) => {
    await sendRequest({ path: 'edit-product/' + productId, method: 'PUT', data });
  };

  return <AdDetails user={user} product={product} onEdit={updateItem} error={error} />;
}

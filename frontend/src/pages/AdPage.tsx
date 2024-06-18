import AdDetails from '@/components/details/AdDetails';
import ErrorPage from '@/components/error/Error';
import { useFetch } from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function AdPage() {
  const { productId }     = useParams();
  const { data: product } = useFetch('product/' + productId);
  const { data: user }    = useFetch('login');

  if (!product) {
    return <ErrorPage />;
  }

  return <AdDetails user={user} product={product} />;
}

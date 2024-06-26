import ErrorPage from '@/components/error/Error';
import LoadingIndicator from '@/components/loading/LoadingIndicator';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';

export default function MarketPage() {
  const { data: user } = useFetch('login');
  const { data: products, isLoading } = useFetch('products' + (user ? '/populated' : ''));

  return isLoading ? (
    <LoadingIndicator />
  ) : products ? (
    <Products expanded={user} products={products} />
  ) : (
    <ErrorPage />
  );
}

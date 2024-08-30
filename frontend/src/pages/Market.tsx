import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';

export default function MarketPage() {
  const { data: user } = useFetch({ params: 'login' });
  const { data: products, isLoading } = useFetch({ params: 'products' + (user ? '/populated' : '') });

  return  <Products isLoggedIn={user} products={(products || [])} isLoading={isLoading} />

}

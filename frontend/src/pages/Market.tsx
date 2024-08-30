import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';

export default function MarketPage() {
  const { data: user } = useFetch('login');
  const { data: products, isLoading } = useFetch('products' + (user ? '/populated' : ''));

  return  <Products isLoggedIn={user} products={(products || [])} isLoading={isLoading} />

}

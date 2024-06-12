import LoadingIndicator from '@/components/loading/LoadingIndicator';
import Products from '@/components/products/Products';
import { useFetch } from '@/hooks/useFetch';

export default function MarketPage() {
  const { data: products, isLoading } = useFetch('products');

  return isLoading ? <LoadingIndicator /> : <Products products={products || []} />;
}

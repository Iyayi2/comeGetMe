import Products from '../components/products/Products';
import { useFetch } from '../hooks/useFetch';

export default function MarketPage() {
  const { data: products } = useFetch('products');

  return <Products products={products || []} />;
}

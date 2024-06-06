import Products from '../components/products/Products';
import { useFetch } from '../hooks/useFetch';

export default function MarketPage() {
  const products = useFetch('products');

  console.log(products);

  return <Products products={products} />;
}

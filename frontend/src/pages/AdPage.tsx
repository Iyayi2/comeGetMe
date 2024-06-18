import { useFetch } from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function AdPage() {
  const { productId } = useParams();
  const { data: product } = useFetch('product/' + productId);
  console.log(productId, product);
  return <h1>Ad page {productId} </h1>;
}

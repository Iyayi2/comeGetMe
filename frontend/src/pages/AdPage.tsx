import { useParams } from 'react-router-dom';

export default function AdPage() {
  const { productId  } = useParams();
  console.log(productId )
  return <h1>Ad page {productId } </h1>;
}

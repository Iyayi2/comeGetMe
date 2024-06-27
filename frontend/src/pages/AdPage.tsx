import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import AdDetails from '@/components/details/AdDetails';
import ErrorPage from '@/components/error/Error';
import LoadingIndicator from '@/components/loading/LoadingIndicator';

export default function AdPage() {
  const { productId } = useParams();
  const { data: product, setData, sendRequest, isLoading, error } = useHTTP();
  const { isLoading: isFetching } = useFetch('product/' + productId, setData);
  const { data: user }            = useFetch('login');
  const [expanded, setExpanded]   = useState(false);

  const updateItem = async (data: object) => {
    const didUpdate = await sendRequest({ path: 'edit-product/' + productId, method: 'PUT', data });
    didUpdate && setExpanded(false);
  };

  const deleteItem = async () => {
    await sendRequest({ path: 'delete-product/' + productId, method: 'DELETE' });
  };

  return isFetching ? (
    <LoadingIndicator />
  ) : product ? (
    <AdDetails
      user      ={user}
      product   ={product}
      onEdit    ={updateItem}
      onDelete  ={deleteItem}
      isLoading ={isLoading}
      error     ={error}
      expanded  ={expanded}
      toggleForm={() => setExpanded((toggle) => !toggle)}
    />
  ) : (
    <ErrorPage type='ad' />
  );
}

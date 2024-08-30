import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '@/store/Context';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import ProductIdDetails from '@/components/details/ProductIdDetails';
import ErrorPage from '@/components/error/Error';
import LoadingIndicator from '@/components/loading/LoadingIndicator';

export default function MarketIdPage() {
  const { productId } = useParams();
  const { data: product, setData, sendRequest, isLoading, error } = useHTTP();
  const { isLoading: isFetching } = useFetch('product/' + productId, setData );
  const { data: user } = useFetch('login');
  const [expanded, setExpanded] = useState(false);
  const { navTo } = useContext(Context);

  const updateItem = async (data: object) => {
    const didUpdate = await sendRequest({
      params: 'edit-product/' + productId,
      method: 'PUT',
      data,
    });
    didUpdate && setExpanded(false);
  };

  const deleteItem = async () => {
    const hasError = await sendRequest({ params: 'delete-product/' + productId, method: 'DELETE' });
    if (!hasError) {
      navTo('/account');
    }
  };

  return isFetching ? (
    <LoadingIndicator />
  ) : product ? (
    <ProductIdDetails
            user={user}
         product={product}
          onEdit={updateItem}
        onDelete={deleteItem}
       isLoading={isLoading}
           error={error}
        expanded={expanded}
      toggleForm={() => setExpanded((toggle) => !toggle)}
    />
  ) : (
    <ErrorPage type='product' />
  );
}

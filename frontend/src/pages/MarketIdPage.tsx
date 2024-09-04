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
  const { data: product, setData, sendRequest, isLoading, error, setError } = useHTTP();
  const { isLoading: isFetching } = useFetch('product/' + productId, setData);
  const { data: user } = useFetch('login');
  const [expanded, setExpanded] = useState(false);
  const { navTo, isAnimating, setIsAnimating } = useContext(Context);

  const updateItem = async (data: object) => {
    setIsAnimating(true)
    const didUpdate = await sendRequest({ params: 'edit-product/' + productId, method: 'PUT', data });
    didUpdate && setExpanded(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const deleteItem = async () => {
    const hasError = await sendRequest({ params: 'delete-product/' + productId, method: 'DELETE' });
    if (!hasError) {
      navTo('/account');
    }
  };

  const toggleForm = (ref: React.RefObject<HTMLElement>) => {
    if (!isAnimating) {
      setIsAnimating(true)
      setExpanded((toggle) => !toggle)
      setError(null);
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }

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
      toggleForm={toggleForm}
    />
  ) : (
    <ErrorPage type='product' />
  );
}

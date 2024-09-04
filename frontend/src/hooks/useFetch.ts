import { Dispatch, SetStateAction, useCallback, useContext, useEffect } from 'react';
import { useHTTP } from './useHTTP';
import { useParams } from 'react-router-dom';
import { Context } from '@/store/Context';

export const useFetch = <T = null>(
            params: string,
  setExternalData?: Dispatch<SetStateAction<T>>
) => {
  const { data, setData, isLoading, error, setError, sendRequest } = useHTTP<T>();
  const { setMetadata } = useContext(Context);
  const {  productId  } = useParams();

  const getData = useCallback(async () => {
    const response = await sendRequest({ params, method: 'GET' });
    setExternalData && setExternalData(response); // allows to update another state with this data
    if (productId && response?.title && response?.description) {
        const { title, description } = response;
        setMetadata({ title, description }); // update dynamic product path metadata
    }
  }, [params, productId, sendRequest, setExternalData, setMetadata]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, setData, getData, isLoading, error, setError };
};

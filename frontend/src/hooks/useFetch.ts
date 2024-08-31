import { Dispatch, SetStateAction, useCallback, useContext, useEffect } from 'react';
import { useHTTP } from './useHTTP';
import { useParams } from 'react-router-dom';
import { Context } from '@/store/Context';

export const useFetch = <T = null>(
            params: string,
  setExternalData?: Dispatch<SetStateAction<T>>
) => {
  const { data, setData, isLoading, error, sendRequest } = useHTTP<T>();
  const { metadata, setMetadata } = useContext(Context);
  const { productId } = useParams();
  console.log('useFetch: params:', productId); // LogData

  const getData = useCallback(async () => {
    const response = await sendRequest({ params, method: 'GET' });
    setExternalData && setExternalData(response); // allows to update another state with this data
    if (productId) {
      if (response.title && response.description) {
        setMetadata({ title: response.title, description: response.description })
      }
    }
  }, [params, productId, sendRequest, setExternalData, setMetadata]); // LogData

  useEffect(() => {
    getData();
  }, [getData]);

  console.log('useFetch metadata', metadata) // LogData

  return { data, setData, getData, isLoading, error };
};

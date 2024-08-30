import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useHTTP } from './useHTTP';

export const useFetch = <T = null>(
            params: string,
  setExternalData?: Dispatch<SetStateAction<T>>
) => {
  const { data, setData, isLoading, error, sendRequest } = useHTTP<T>();

  const getData = useCallback(async () => {
    const response = await sendRequest({ params, method: 'GET' });
    setExternalData && setExternalData(response); // allows to update another state with this data
  }, [params, sendRequest, setExternalData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, setData, getData, isLoading, error };
};

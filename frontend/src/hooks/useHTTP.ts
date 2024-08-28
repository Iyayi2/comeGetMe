import { useCallback, useState } from 'react';
import { Fetch, fetchData } from '../util/fetchData';

export type APIError = { errors: object; keyPattern: object; path: string; } | null;

export function useHTTP<T = null>(initialData = null) {
  const [     data,      setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [    error,     setError] = useState<APIError>(null);

  const sendRequest = useCallback(async ({ params, method, data }: Fetch) => {
    console.clear(); // logData
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchData({ params, method, data });
      setData(response);
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      setError(err as APIError);
    }
  }, []);

  return { data, setData, isLoading, error, sendRequest };
}

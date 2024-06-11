import { useCallback, useState } from 'react';
import { Fetch, fetchData } from '../util/fetchData';

export function useHTTP(initialData = null) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async ({ path, method, data }: Fetch) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchData({ path, method, data });
      setData(response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError((err as Error).message);
    }
  },[]);

  return { data, setData, isLoading, error, sendRequest };
}

import { useState } from 'react';
import { Fetch, fetchData } from '../util/fetchData';

export function useHTTP() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async ({ path, method, data }: Fetch) => {
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
  };

  return { data, isLoading, error, sendRequest };
}

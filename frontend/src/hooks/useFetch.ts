import { useEffect } from "react";
import { useHTTP } from "./useHTTP";

export const useFetch = (path: string) => {
  const { data, isLoading, error, sendRequest } = useHTTP();

  useEffect(() => {
    const getData = async () => {
      await sendRequest({ path, method: 'GET' });
    };

    getData();
  }, [path, sendRequest]);

  return { data, isLoading, error };
};

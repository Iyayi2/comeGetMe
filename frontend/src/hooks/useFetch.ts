import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useHTTP } from "./useHTTP";

export const useFetch =  <T = null>(path: string, setExternalData?: Dispatch<SetStateAction<null>>) => {
  const { data, setData, isLoading, error, sendRequest } = useHTTP<T>();

  const getData = useCallback(async () => {
    const response = await sendRequest({ path, method: 'GET' });
    setExternalData && setExternalData(response); // allows to update another state with this data
  }, [path, sendRequest, setExternalData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, setData, getData, isLoading, error };
};

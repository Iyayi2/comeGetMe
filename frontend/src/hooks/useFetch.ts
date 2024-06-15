import { Dispatch, SetStateAction, useEffect } from "react";
import { useHTTP } from "./useHTTP";

export const useFetch =  <T = null>(path: string, setExternalData?: Dispatch<SetStateAction<null>>) => {
  const { data, setData, isLoading, error, sendRequest } = useHTTP<T>();

  useEffect(() => {
    const getData = async () => {
      const response = await sendRequest({ path, method: 'GET' });
      setExternalData && setExternalData(response); // allows to update another state with this data
    };

    getData();
  }, [path, sendRequest, setExternalData]);

  return { data, setData, isLoading, error };
};

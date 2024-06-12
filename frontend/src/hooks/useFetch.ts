import { Dispatch, SetStateAction, useEffect } from "react";
import { useHTTP } from "./useHTTP";

export const useFetch = (path: string, setData?: Dispatch<SetStateAction<null>>) => {
  const { data, isLoading, error, sendRequest } = useHTTP();

  useEffect(() => {
    const getData = async () => {
      const response = await sendRequest({ path, method: 'GET' });
      setData && setData(response); // allows to update another state with this data
    };

    getData();
  }, [path, sendRequest, setData]);

  return { data, isLoading, error };
};

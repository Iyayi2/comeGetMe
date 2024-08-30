import { Dispatch, SetStateAction, useCallback, useContext, useEffect } from "react";
import { useHTTP } from "./useHTTP";
import { Context } from "@/store/Context";

export const useFetch = <T = null>({
  params,
  setExternalData,
  metadata,
}: {
            params: string;
  setExternalData?: Dispatch<SetStateAction<T>>;
         metadata?: boolean | undefined;
}) => {
  const { data, setData, isLoading, error, sendRequest } = useHTTP<T>();
  const { setMetadata } = useContext(Context);

  const getData = useCallback(async () => {
    const response = await sendRequest({ params, method: 'GET' });
    setExternalData && setExternalData(response); // allows to update another state with this data
           metadata &&     setMetadata(response); // set dynamic metadata routes
  }, [params, sendRequest, setExternalData, metadata, setMetadata]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, setData, getData, isLoading, error };
};

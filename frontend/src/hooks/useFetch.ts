import { useEffect, useState } from "react";
import { fetchData } from "../util/fetchData";

export const useFetch = (path: string, initialState: object | []) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData({ path, method: 'GET' });
      setData(data);
    };

    getData();
  }, [path]);

  return data;
}

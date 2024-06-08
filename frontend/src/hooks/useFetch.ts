import { useEffect, useState } from "react";
import { fetchData } from "../util/fetchData";

export const useFetch = (path: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData({ path, method: 'GET' });
      setData(data);
    };

    getData();
  }, [path]);

  return data;
}

import { useEffect, useState } from "react";

export const useFetch = (path: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/${path}`);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return data;
}

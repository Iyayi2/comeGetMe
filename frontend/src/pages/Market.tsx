import { useEffect, useState } from "react";

export default function MarketPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  console.log(data)

  return <h1>MARKET Page</h1>
}

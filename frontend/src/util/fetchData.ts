interface DataProps {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
}

export const fetchData = async ({ path, method, data }: DataProps) => {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // send cookies to backend
    body: data ? JSON.stringify(data) : null,
  });

  const resData = await response.json();

  return resData;
};

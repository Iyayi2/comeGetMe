export interface Fetch {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
}

export const fetchData = async ({ path, method, data }: Fetch) => {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // send cookies to backend
    body: data ? JSON.stringify(data) : null,
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'Something went wrong');
  }

  console.log('[Server Response]', resData); // logData

  return resData;
};

export interface Fetch {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
}

export const fetchData = async ({ path, method, data }: Fetch) => {
  const isFormData = data instanceof FormData;
  const body = data ? (isFormData ? data : JSON.stringify(data)) : null;

  const response = await fetch(`http://localhost:3000/${path}`, {
    method,
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    credentials: 'include', // send cookies to backend
    body,
  });

  const resData = await response.json();

  console.log('[Server Response]', resData); // logData

  if (!response.ok) {
    throw resData;
  }

  return resData;
};

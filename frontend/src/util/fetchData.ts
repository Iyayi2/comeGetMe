export interface Fetch {
  params: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
   data?: object;
}

export const fetchData = async ({ params, method, data }: Fetch) => {
  const isFormData = data instanceof FormData;
  const body = data ? (isFormData ? data : JSON.stringify(data)) : null;

  const response = await fetch(import.meta.env.VITE_SERVER_URL + params, {
    method,
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    credentials: 'include', // send cookies to backend
    body,
  });

  const resData = await response.json();

  if (!response.ok) {
    throw resData;
  }

  return resData;
};

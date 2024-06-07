export const fetchData = async (path: string, data?: object) => {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  });

  const resData = await response.json();

  return resData;
};

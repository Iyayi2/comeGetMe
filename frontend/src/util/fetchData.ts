export const fetchData = async (path: string, data: object) => {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  return resData;
}

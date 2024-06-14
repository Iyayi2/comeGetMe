import { useHTTP } from '@/hooks/useHTTP';
import Input from './Input';

export default function AddItemForm() {
  const { sendRequest } = useHTTP();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await sendRequest({ path: 'add-product', method: 'POST', data });
    console.log('[Item Data]', Object.fromEntries(data.entries())); // logData
  };

  return (
    <form onSubmit={submitHandler}>
      <Input id='title' />
      <Input id='price' />
      <Input id='description' />
      <input type='file' accept='image/*' name='image' />
      <button>Add Item</button>
    </form>
  );
}

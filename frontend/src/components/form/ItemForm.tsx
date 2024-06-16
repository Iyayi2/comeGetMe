import Input from './Input';

export default function ItemForm({ onAddItem }: { onAddItem: (data: object) => void }) {

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAddItem(data)
  };

  return (
    <form onSubmit={submitHandler}>
      <Input id='title' />
      <Input id='price' />
      <Input id='description' text />
      <input type='file' accept='image/*' name='image' />
      <button>Add Item</button>
    </form>
  );
}

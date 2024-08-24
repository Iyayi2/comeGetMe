import { useFetch } from "@/hooks/useFetch";

export default function Inbox() {
  const { data } = useFetch('conversation');

  console.log(data);

  return (
    <div>
      <input />
      <button>Send</button>
    </div>
  );
}

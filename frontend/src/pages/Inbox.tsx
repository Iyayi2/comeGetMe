import { useFetch } from "@/hooks/useFetch";
import { Context } from "@/store/Context";
import { useContext } from "react";

export default function Inbox() {
  const { userId } = useContext(Context);
  const { data } = useFetch('conversation/' + userId);

  console.log(data);

  return (
    <div>
      <input />
      <button>Send</button>
    </div>
  );
}

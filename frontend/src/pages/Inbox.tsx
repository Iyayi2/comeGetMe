import { Context } from "@/store/Context";
import { useContext } from "react";

export default function Inbox() {
  const { userId } = useContext(Context);

  console.log(userId);

  return (
    <div>
      <input />
      <button>Send</button>
    </div>
  );
}

import Message from "@/models/Message";

export function returnNewMessages(oldData: Message[], newData: Message[]) {
  const oldIds = new Set(oldData.map((obj) => obj._id));
  const newObjects = newData.filter((obj) => !oldIds.has(obj._id));
  return newObjects;
}

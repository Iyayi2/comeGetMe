export function compareArrays<T extends { _id: string }>(oldData: T[], newData: T[]): T[] {
  const oldIds = new Set(oldData.map((obj) => obj._id));
  const newObjects = newData.filter((obj) => !oldIds.has(obj._id));
  return newObjects;
}

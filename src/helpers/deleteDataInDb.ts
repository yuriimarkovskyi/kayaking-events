import {
  Database, equalTo, get, orderByChild, query, ref, remove,
} from 'firebase/database';

const deleteDataInDb = async (
  db: Database,
  path: string,
  orderKey: string,
  callback: string | number,
) => {
  const dbRef = ref(db, path);
  const queryConstraints = [orderByChild(orderKey), equalTo(callback)];
  const selectedData = await get(query(dbRef, ...queryConstraints));
  const summaryRef = ref(db, `${path}/${Object.keys(selectedData.val()).toString()}`);

  return remove(summaryRef);
};

export { deleteDataInDb };

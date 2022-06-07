import {
  Database,
  equalTo, get, orderByChild, query, ref, update,
} from 'firebase/database';

const updateDataInDb = async (
  db: Database,
  path: string,
  orderKey: string,
  updatedData: object,
  callback: string | number,
) => {
  const dbRef = ref(db, path);
  const queryConstraints = [orderByChild(orderKey), equalTo(callback)];
  const selectedData = await get(query(dbRef, ...queryConstraints));
  const summaryRef = ref(db, `${path}/${Object.keys(selectedData.val()).toString()}`);

  return update(summaryRef, updatedData);
};

export { updateDataInDb };

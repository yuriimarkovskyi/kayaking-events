import { db } from 'config/firebase';
import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

const pushDataToDb = (path: string, data: unknown) => {
  const pathRef = ref(db, path);
  const dataRef = push(pathRef);

  return set(dataRef, data);
};

const updateDataInDb = async (
  path: string,
  orderKey: string,
  updatedData: object,
  callback: string | number,
) => {
  const dbRef = ref(db, path);
  const queryConstraints = [orderByChild(orderKey), equalTo(callback)];
  const selectedData = await get(query(dbRef, ...queryConstraints));
  const summaryRef = ref(db, `${path}/${Object.keys(selectedData.val())
    .toString()}`);

  return update(summaryRef, updatedData);
};

const deleteDataInDb = async (
  path: string,
  orderKey: string,
  callback: string | number,
) => {
  const dbRef = ref(db, path);
  const queryConstraints = [orderByChild(orderKey), equalTo(callback)];
  const selectedData = await get(query(dbRef, ...queryConstraints));
  const summaryRef = ref(db, `${path}/${Object.keys(selectedData.val())
    .toString()}`);

  return remove(summaryRef);
};

export { deleteDataInDb, pushDataToDb, updateDataInDb };

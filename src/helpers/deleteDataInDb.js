import {
  equalTo, get, orderByChild, query, ref, remove,
} from 'firebase/database';

const deleteDataInDb = async (database, path, orderKey, callback) => {
  const databaseRef = ref(database, path);
  const queryConstraints = [orderByChild(orderKey), equalTo(callback)];
  const selectedData = await get(query(databaseRef, ...queryConstraints));
  const summaryRef = ref(database, `${path}/${Object.keys(selectedData.val()).toString()}`);

  return remove(summaryRef);
};

export { deleteDataInDb };

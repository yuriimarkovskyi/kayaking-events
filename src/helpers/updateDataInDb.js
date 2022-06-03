import {
  equalTo, get, orderByChild, query, ref, update,
} from 'firebase/database';

const updateDataInDb = async (database, path, orderKey, updatedData, callback) => {
  const databaseRef = ref(database, path);
  const queryConstraints = [orderByChild(orderKey), equalTo(callback)];
  const selectedData = await get(query(databaseRef, ...queryConstraints));
  const summaryRef = ref(database, `${path}/${Object.keys(selectedData.val()).toString()}`);

  return update(summaryRef, updatedData);
};

export { updateDataInDb };

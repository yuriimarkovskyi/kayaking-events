import { push, ref, set } from 'firebase/database';

const pushDataToBase = (database, path, data) => {
  const pathRef = ref(database, path);
  const dataRef = push(pathRef);
  set(dataRef, data);
};

export { pushDataToBase };

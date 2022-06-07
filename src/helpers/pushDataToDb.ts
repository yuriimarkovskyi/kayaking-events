import {
  Database, push, ref, set,
} from 'firebase/database';

const pushDataToDb = (db: Database, path: string, data: unknown) => {
  const pathRef = ref(db, path);
  const dataRef = push(pathRef);

  return set(dataRef, data);
};

export { pushDataToDb };

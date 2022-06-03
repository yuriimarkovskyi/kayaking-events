import { useEffect } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import _ from 'lodash';
import { firebaseDb } from '../firebase/firebase';

const filtersInColumnsTable = (data, objectValue, columns) => {
  const [registrationsValues] = useListVals(ref(firebaseDb, 'registrations'));
  const arr = [];
  const column = columns.filter((el) => el.dataIndex === objectValue);

  data.forEach((el) => arr.push(el[objectValue]));

  useEffect(() => _.uniq(arr).forEach((el) => column.forEach((item) => item.filters.push({
    text: el,
    value: el,
  }))), [registrationsValues.length]);
};

export { filtersInColumnsTable };

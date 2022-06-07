import _ from 'lodash';

const useFilter = (data, objectKey, objectValue, columns) => {
  const arr = [];
  const filteredColumns = columns.filter((val) => val[objectKey] === objectValue);

  data.forEach((el) => arr.push(el[objectValue]));

  _.uniq(arr).forEach((val) => filteredColumns.forEach((col) => (
    col.filters.push({
      text: val,
      value: val,
    })
  )));
};

export { useFilter };

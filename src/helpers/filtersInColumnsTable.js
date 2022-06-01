const filtersInColumnsTable = (data, objectValue, columns) => {
  const arr = [];

  data.forEach((el) => arr.push(el[objectValue]));

  const uniqArr = [...new Set(arr)];

  const column = columns.filter((el) => el.dataIndex === objectValue);

  return uniqArr.forEach((el) => column.map((item) => item.filters.push({
    text: el,
    value: el,
  })));
};

export { filtersInColumnsTable };

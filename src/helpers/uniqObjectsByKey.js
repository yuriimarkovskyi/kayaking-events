const uniqObjectsByKey = (arr, key, data) => {
  const result = [...new Set(arr.map((x) => x[key]))].map((x) => ({ [key]: x, [data]: [] }));
  arr.forEach((x) => result.find((y) => y[key] === x[key])[data].push(x[data]));

  return result;
};

export { uniqObjectsByKey };

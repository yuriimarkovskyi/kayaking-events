const filterObjectByKey = (object, objectKey) => (
  Object.fromEntries(Object.entries(object).filter(([key]) => key.includes(objectKey)))
);

export default filterObjectByKey;

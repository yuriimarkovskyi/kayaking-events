import { Form } from 'antd';

const useWatchValues = (array, form) => {
  const arr = [];

  array.forEach((arrValue) => arr.push(Form.useWatch(arrValue, form)));

  return arr;
};

export { useWatchValues };

import { Form } from 'antd';

export const useWatchValues = (array, form) => {
  const arr = [];

  array.forEach((arrValue) => arr.push(Form.useWatch(arrValue, form)));

  return arr;
};

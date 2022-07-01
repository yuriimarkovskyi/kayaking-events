const validateMessages = {
  required: 'Обов`язкове поле',
  whitespace: 'Поле не може бути пустим',
  string: {
    min: 'Поле має містити у собі мінімум ${min} символів',
    max: 'Поле має містити у собі максимум ${max} символів',
  },
  types: {
    email: 'email має бути коректним',
    url: 'Посилання має бути коректним',
  },
  pattern: {
    mismatch: 'Поле містить неприпустимі символи',
  },
};

export default validateMessages;

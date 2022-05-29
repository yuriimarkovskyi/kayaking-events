import { Tag } from 'antd';

const registrationsColumns = [
  {
    title: 'Івент',
    dataIndex: 'eventName',
    fixed: 'left',
    filters: [],
    onFilter: (value, record) => record.eventName.indexOf(value) === 0,
  },
  {
    title: 'Зареєстровано',
    dataIndex: 'registrationTime',
    sortDirections: ['ascend', 'descend', 'ascend'],
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'Дата івенту',
    dataIndex: 'eventDate',
    ellipsis: true,
    filters: [],
    onFilter: (value, record) => record.eventDate.indexOf(value) === 0,
  },
  {
    title: 'ПІБ',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (email) => (
      <a href={`mailto:${email}`}>
        {email}
      </a>
    ),
  },
  {
    title: 'Номер телефону',
    dataIndex: 'phone',
    render: (phone) => (
      <a href={`tel:${phone}`}>
        {phone}
      </a>
    ),
  },
  {
    title: 'Одномісних',
    dataIndex: 'soloKayaks',
  },
  {
    title: 'Двомісних',
    dataIndex: 'doubleKayaks',
  },
  {
    title: 'Діти',
    dataIndex: 'isChildren',
    render: (tag) => (
      <Tag key={tag}>
        {tag}
      </Tag>
    ),
  },
  {
    title: 'Кількість дітей',
    dataIndex: 'childrenAmount',
  },
  {
    title: 'Сума до сплати',
    dataIndex: 'amount',
    ellipsis: true,
  },
  {
    title: 'Нотатки',
    dataIndex: 'notes',
    ellipsis: true,
  },
];
const eventsColumns = [
  {
    title: 'Івент',
    dataIndex: 'name',
  },
  {
    title: 'Лінк',
    dataIndex: 'link',
  },
  {
    title: 'Заголовок',
    dataIndex: 'title',
  },
  {
    title: 'Опис',
    dataIndex: 'description',
  },
  {
    title: 'Обкладинка',
    dataIndex: 'imageCover',
  },
  {
    title: 'Дати',
    dataIndex: 'dates',
  },
  {
    title: 'Ціна за одномісний каяк',
    dataIndex: 'priceSoloKayak',
  },
  {
    title: 'Ціна за двомісний каяк',
    dataIndex: 'priceDoubleKayak',
  },
  {
    title: 'Зображення слайдеру',
    dataIndex: 'images',
  },
  {
    title: 'Ключові моменти',
    dataIndex: 'descriptionFeatures',
  },
];

export {
  registrationsColumns, eventsColumns,
};

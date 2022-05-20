import { Tag } from 'antd';

export const dataSource = [];
export const columns = [
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
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Дата івенту',
    dataIndex: 'eventDate',
    ellipsis: true,
  },
  {
    title: 'ПІБ',
    dataIndex: 'customerName',
  },
  {
    title: 'Email',
    dataIndex: 'customerEmail',
    render: (email) => (
      <a href={`mailto:${email}`}>
        {email}
      </a>
    ),
  },
  {
    title: 'Номер телефону',
    dataIndex: 'customerPhone',
    render: (phone) => (
      <a href={`tel:${phone}`}>
        {phone}
      </a>
    ),
  },
  {
    title: 'Одномісних каяків',
    dataIndex: 'soloKayaks',
  },
  {
    title: 'Двомісних каяків',
    dataIndex: 'doubleKayaks',
  },
  {
    title: 'Діти',
    dataIndex: 'isChildren',
    render: (tag) => (
      <Tag key={tag}>
        {tag.toUpperCase()}
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

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
  },
  {
    title: 'Номер телефону',
    dataIndex: 'customerPhone',
  },
  {
    title: 'Одномісних каяків',
    dataIndex: 'numberOfSoloKayaks',
  },
  {
    title: 'Двомісних каяків',
    dataIndex: 'numberOfDoubleKayaks',
  },
  {
    title: 'Сума до сплати',
    dataIndex: 'amountPayable',
    ellipsis: true,
  },
  {
    title: 'Нотатки',
    dataIndex: 'notes',
    ellipsis: true,
  },
  {
    title: 'Статус',
    dataIndex: 'isCompleted',
    render: () => (
      <input type="checkbox" />
    ),
  },
];

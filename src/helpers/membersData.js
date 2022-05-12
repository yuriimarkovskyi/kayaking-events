export const dataSource = [];
export const columns = [
  {
    title: 'Івент',
    dataIndex: 'event',
    fixed: 'left',
    width: 120,
    filters: [],
    onFilter: (value, record) => record.event.indexOf(value) === 0,
  },
  {
    title: 'Дата реєстрації',
    dataIndex: 'id',
    width: 120,
    sortDirections: ['ascend', 'descend', 'ascend'],
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.id).getTime() - new Date(b.id).getTime(),
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: 'Ім`я',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: 'Номер телефону',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: 'Одномісних каяків',
    dataIndex: 'soloKayaks',
    width: 120,
  },
  {
    title: 'Двомісних каяків',
    dataIndex: 'doubleKayaks',
    width: 120,
  },
  {
    title: 'Сума до сплати',
    dataIndex: 'price',
    width: 120,
  },
  {
    title: 'Нотатки',
    dataIndex: 'notes',
    width: 120,
  },
  {
    title: 'Статус',
    dataIndex: 'isCompleted',
    width: 120,
  },
];

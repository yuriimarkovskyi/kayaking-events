import {
  Badge, Button, Popconfirm, Space, Tag,
} from 'antd';
import {
  equalTo, get, orderByChild, query, ref, remove, update,
} from 'firebase/database';
import { firebaseDatabase } from '../firebase/firebase';

const updateData = async (value) => {
  const databaseRef = ref(firebaseDatabase, 'registrations');
  const queryConstraints = [orderByChild('key'), equalTo(value)];
  const selectedData = await get(query(databaseRef, ...queryConstraints));
  const summaryRef = ref(firebaseDatabase, `registrations/${Object.keys(selectedData.val()).toString()}`);

  return update(summaryRef, { isCompleted: true });
};

const deleteData = async (value) => {
  const databaseRef = ref(firebaseDatabase, 'registrations');
  const queryConstraints = [orderByChild('key'), equalTo(value)];
  const selectedData = await get(query(databaseRef, ...queryConstraints));
  const summaryRef = ref(firebaseDatabase, `registrations/${Object.keys(selectedData.val()).toString()}`);

  return remove(summaryRef);
};

const registrationsColumns = [
  {
    title: 'Івент',
    dataIndex: 'eventName',
    fixed: 'left',
    filters: [],
    onFilter: (value, record) => record.eventName.indexOf(value) === 0,
    render: (value, record) => (
      record.isCompleted
        ? (
          <Badge dot status="success">
            {value}
          </Badge>
        )
        : (
          <Badge dot status="default">
            {value}
          </Badge>
        )
    ),
  },
  {
    title: 'Зареєстровано',
    dataIndex: 'registrationTime',
    sortDirections: ['ascend', 'descend', 'ascend'],
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'Дата',
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
    title: 'До сплати',
    dataIndex: 'amount',
    ellipsis: true,
  },
  {
    title: 'Нотатки',
    dataIndex: 'notes',
    ellipsis: true,
  },
  {
    title: 'Дії',
    key: 'action',
    align: 'center',
    render: (value) => (
      <Space>
        <Button
          type="link"
          onClick={() => updateData(value.key)}
        >
          Узгоджено
        </Button>
        <Popconfirm
          placement="left"
          title="Ви впевнені?"
          okText="Так"
          cancelText="Ні"
          onConfirm={() => deleteData(value.key)}
        >
          <Button type="link" danger>
            Видалити
          </Button>
        </Popconfirm>
      </Space>
    ),
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

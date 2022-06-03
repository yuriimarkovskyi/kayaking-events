import {
  Badge, Button, Dropdown, Menu, Popconfirm, Tag, Tooltip,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { firebaseDb } from '../firebase/firebase';
import { updateDataInDb } from '../helpers/updateDataInDb';
import { deleteDataInDb } from '../helpers/deleteDataInDb';

const updateIsCompleted = (callback) => (
  updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: true }, callback)
);

const updateIsRejected = (callback) => (
  updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: false, isRejected: true }, callback)
);

const deleteRegistration = (callback) => (
  deleteDataInDb(firebaseDb, 'registrations', 'key', callback)
);

const deleteInstructor = (callback) => (
  deleteDataInDb(firebaseDb, 'instructors', 'key', callback)
);

const registrationsColumns = [
  {
    title: 'Івент',
    dataIndex: 'eventName',
    fixed: 'left',
    filters: [],
    onFilter: (value, record) => record.eventName.indexOf(value) === 0,
    render: (value, record) => {
      if (record.isCompleted) {
        return (
          <Badge dot status="success">
            {value}
          </Badge>
        );
      }
      if (record.isRejected) {
        return (
          <Badge dot status="error">
            {value}
          </Badge>
        );
      }
      return (
        <Badge dot status="default">
          {value}
        </Badge>
      );
    },
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
    ellipsis: {
      showTitle: false,
    },
    render: (notes) => (
      <Tooltip placement="topLeft" title={notes}>
        {notes}
      </Tooltip>
    ),
  },
  {
    title: 'Дії',
    key: 'actions',
    render: (value) => (
      <Dropdown
        placement="topLeft"
        arrow={{
          pointAtCenter: true,
        }}
        overlay={(
          <Menu
            items={[
              !value.isCompleted && !value.isRejected
                ? {
                  key: '1',
                  label: (
                    <Button
                      type="dashed"
                      block
                      onClick={() => updateIsCompleted(value.key)}
                    >
                      Узгоджено
                    </Button>
                  ),
                } : null,
              !value.isRejected
                ? {
                  key: '2',
                  label: (
                    <Button
                      type="dashed"
                      block
                      onClick={() => updateIsRejected(value.key)}
                    >
                      Скасовано
                    </Button>
                  ),
                } : null,
              {
                key: '3',
                label: (
                  <Popconfirm
                    placement="left"
                    title="Ви впевнені?"
                    okText="Так"
                    cancelText="Ні"
                    onConfirm={() => deleteRegistration(value.key)}
                  >
                    <Button type="dashed" block danger>
                      Видалити
                    </Button>
                  </Popconfirm>
                ),
              },
            ]}
          />
      )}
      >
        <Button type="dashed">
          Список дій
          <DownOutlined />
        </Button>
      </Dropdown>
    ),
  },
];

const instructorsColumns = [
  {
    title: 'ПІБ',
    dataIndex: 'name',
  },
  {
    title: 'Facebook',
    render: (value) => (
      <a href={value.links.facebook} target="_blank" rel="noreferrer">
        {value.links.facebook}
      </a>
    ),
  },
  {
    title: 'Instagram',
    render: (value) => (
      <a href={value.links.instagram} target="_blank" rel="noreferrer">
        {value.links.instagram}
      </a>
    ),
  },
  {
    title: 'Дії',
    dataIndex: 'actions',
    render: (_, render) => (
      <Popconfirm
        placement="left"
        title="Ви впевнені?"
        okText="Так"
        cancelText="Ні"
        onConfirm={() => deleteInstructor(render.key)}
      >
        <Button block danger>
          Видалити
        </Button>
      </Popconfirm>
    ),
  },
];

export {
  registrationsColumns, instructorsColumns,
};

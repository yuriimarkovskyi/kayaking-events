import { ColumnsType } from 'antd/lib/table';
import {
  Badge, Button, Dropdown, Menu, Popconfirm, Tag, Tooltip,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { Key } from 'react';
import { ICustomerTransformed } from 'types';
import { updateDataInDb } from 'helpers/updateDataInDb';
import { firebaseDb } from 'firebaseConfig';
import { deleteDataInDb } from 'helpers/deleteDataInDb';

const updateIsCompleted = (e: Key) => (
  updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: true }, e)
);

const updateIsRejected = (e: Key) => (
  updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: false, isRejected: true }, e)
);

const deleteRegistration = (e: Key) => (
  deleteDataInDb(firebaseDb, 'registrations', 'key', e)
);

const registrationsColumns: ColumnsType<ICustomerTransformed> = [
  {
    title: 'Івент',
    dataIndex: 'eventName',
    fixed: 'left',
    filters: [],
    onFilter: (value, record) => record.eventName.includes(value as string),
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
    sorter: (a, b) => Number(a.key) - Number(b.key),
  },
  {
    title: 'Дата',
    dataIndex: 'eventDate',
    ellipsis: true,
    filters: [],
    onFilter: (value, record) => record.eventDate.includes(value as string),
  },
  {
    title: 'ПІБ',
    dataIndex: 'fullName',
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

export { registrationsColumns };

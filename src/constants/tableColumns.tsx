import {
  Badge, Button, Dropdown, Menu, Popconfirm, Tag, Tooltip,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { firebaseDb } from '../firebase/firebase';
import { updateDataInDb } from '../helpers/updateDataInDb';
import { deleteDataInDb } from '../helpers/deleteDataInDb';
import { ICustomerTransformed, IInstructor } from '../types/types';

const updateIsCompleted = (callback: string | number) => (
  updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: true }, callback)
);

const updateIsRejected = (callback: string | number) => (
  updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: false, isRejected: true }, callback)
);

const deleteRegistration = (callback: string | number) => (
  deleteDataInDb(firebaseDb, 'registrations', 'key', callback)
);

const deleteInstructor = (callback: string | number) => (
  deleteDataInDb(firebaseDb, 'instructors', 'key', callback)
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

const instructorsColumns: ColumnsType<IInstructor> = [
  {
    title: 'ПІБ',
    dataIndex: 'name',
  },
  {
    title: 'Facebook',
    render: (_, record) => (
      <a href={record?.links?.facebook} target="_blank" rel="noreferrer">
        {record?.links?.facebook}
      </a>
    ),
  },
  {
    title: 'Instagram',
    render: (_, record) => (
      <a href={record?.links?.instagram} target="_blank" rel="noreferrer">
        {record?.links?.instagram}
      </a>
    ),
  },
  {
    title: 'Дії',
    dataIndex: 'actions',
    render: (_, record) => (
      <Popconfirm
        placement="left"
        title="Ви впевнені?"
        okText="Так"
        cancelText="Ні"
        onConfirm={() => deleteInstructor(record.key)}
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

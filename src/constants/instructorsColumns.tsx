import { Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { firebaseDb } from '../firebase/firebase';
import { deleteDataInDb } from '../helpers/deleteDataInDb';
import { IInstructor } from '../types/types';

const deleteInstructor = (e: string | number) => (
  deleteDataInDb(firebaseDb, 'instructors', 'key', e)
);

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

export { instructorsColumns };

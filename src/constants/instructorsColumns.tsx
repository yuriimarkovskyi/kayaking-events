import { Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { Key } from 'react';
import { firebaseDb } from 'firebaseConfig';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import { IInstructor } from 'types';

const deleteInstructor = (e: Key) => (
  deleteDataInDb(firebaseDb, 'instructors', 'key', e)
);

const instructorsColumns: ColumnsType<IInstructor> = [
  {
    title: 'ПІБ',
    dataIndex: 'name',
  },
  {
    title: 'Facebook',
    render: (value) => (
      <a href={value?.links?.facebook} target="_blank" rel="noreferrer">
        {value?.links?.facebook}
      </a>
    ),
  },
  {
    title: 'Instagram',
    render: (value) => (
      <a href={value?.links?.instagram} target="_blank" rel="noreferrer">
        {value?.links?.instagram}
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

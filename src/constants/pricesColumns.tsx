import type { ColumnsType } from 'antd/lib/table';
import React, { Key } from 'react';
import { IPrice } from 'types';
import { Button, Popconfirm } from 'antd';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import { firebaseDb } from 'firebaseConfig';

const deletePrice = (e: Key) => (
  deleteDataInDb(firebaseDb, 'prices', 'key', e)
);

const pricesColumns: ColumnsType<IPrice> = [
  {
    title: 'Івент',
    dataIndex: 'eventName',
  },
  {
    title: 'За одномісний каяк',
    dataIndex: 'soloKayak',
  },
  {
    title: 'За двомісний каяк',
    dataIndex: 'doubleKayak',
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
        onConfirm={() => deletePrice(record.key)}
      >
        <Button block danger>
          Видалити
        </Button>
      </Popconfirm>
    ),
  },
];

export { pricesColumns };

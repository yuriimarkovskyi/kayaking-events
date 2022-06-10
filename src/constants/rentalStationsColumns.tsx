import type { ColumnsType } from 'antd/lib/table';
import React, { Key } from 'react';
import { IRentalStation } from 'types';
import { Button, Popconfirm } from 'antd';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import { firebaseDb } from 'firebaseConfig';

const deleteStation = (e: Key) => (
  deleteDataInDb(firebaseDb, 'rentalStations', 'key', e)
);

const rentalStationsColumns: ColumnsType<IRentalStation> = [
  {
    title: 'Станція',
    dataIndex: 'rentalName',
  },
  {
    title: 'Адреса',
    render: (value) => (
      <a href={value.address} target="_blank" rel="noreferrer">
        {value.address}
      </a>
    ),
  },
  {
    title: 'Одномісних каяків',
    render: (value) => (
      <span>
        {value.totalPlaces.soloKayaks}
      </span>
    ),
  },
  {
    title: 'Двомісних каяків',
    render: (value) => (
      <span>
        {value.totalPlaces.doubleKayaks}
      </span>
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
        onConfirm={() => deleteStation(record.key)}
      >
        <Button block danger>
          Видалити
        </Button>
      </Popconfirm>
    ),
  },
];

export { rentalStationsColumns };

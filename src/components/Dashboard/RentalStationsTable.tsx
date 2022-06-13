import React, { Key, useMemo, useState } from 'react';
import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { IRentalStation } from 'types';
import { firebaseDb } from 'firebaseConfig';
import { ColumnsType } from 'antd/lib/table';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import RentalStationsForm from './RentalStationsForm';

function RentalStationsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [rentalStations, loading, error] = useListVals<IRentalStation>(ref(firebaseDb, 'rentalStations'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteStation = (e: Key) => (
    deleteDataInDb(firebaseDb, 'rentalStations', 'key', e)
  );

  const columns: ColumnsType<IRentalStation> = [
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
      title: 'Кількість каяків',
      children: [
        {
          title: 'Одномісних',
          render: (value) => (
            <span>
              {value.totalPlaces.soloKayaks}
            </span>
          ),
        },
        {
          title: 'Двомісних',
          render: (value) => (
            <span>
              {value.totalPlaces.doubleKayaks}
            </span>
          ),
        },
      ],
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

  const memoizedFooter = useMemo(() => (
    <Button
      type="primary"
      htmlType="button"
      onClick={showDrawer}
    >
      Додати станцію прокату
    </Button>
  ), []);

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={rentalStations}
        columns={columns}
        footer={() => memoizedFooter}
      />
      <Drawer
        title="Нова станція прокату"
        placement="bottom"
        onClose={closeDrawer}
        visible={isVisible}
        extra={(
          <Button
            htmlType="submit"
            type="primary"
            form="rental-stations-form"
          >
            Додати
          </Button>
            )}
      >
        <RentalStationsForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default RentalStationsTable;

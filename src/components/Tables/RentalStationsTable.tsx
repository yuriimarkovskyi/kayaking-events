import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IRentalStation } from 'types';
import { deleteDataInDb } from 'utils/dbActions';

import RentalStationsForm from '../Forms/RentalStationsForm';

function RentalStationsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [rentalStations, loading, error] = useListVals<IRentalStation>(ref(db, 'rentalStations'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);
  const deleteStation = (e: number) => deleteDataInDb('rentalStations', 'key', e);

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
      title: 'Кількість плавзасобів',
      children: [
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
          title: 'Дошок',
          render: (value) => (
            <span>
              {value.totalPlaces.sups}
            </span>
          ),
        },
      ],
    },
    {
      title: 'Кількість спорядження',
      children: [
        {
          title: 'Дитячих сидінь',
          render: (value) => (
            <span>
              {value.equipment.childSeats}
            </span>
          ),
        },
        {
          title: 'Карбонових весел',
          render: (value) => (
            <span>
              {value.equipment.carbonPaddles}
            </span>
          ),
        },
        {
          title: 'Спідниць',
          children: [
            {
              title: 'Неопренових',
              render: (value) => (
                <span>
                  {value.equipment.neopreneSkirts}
                </span>
              ),
            },
            {
              title: 'Нейлонових',
              render: (value) => (
                <span>
                  {value.equipment.nylonSkirts}
                </span>
              ),
            },
          ],
        },
        {
          title: 'Водонепроникних кейсів',
          render: (value) => (
            <span>
              {value.equipment.waterproofCases}
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

import React, {
  useMemo, useState, Key,
} from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import {
  Button, Drawer, Popconfirm, Table, Tooltip,
} from 'antd';
import { IEvent, IPrice } from 'types';
import { firebaseDb } from 'firebaseConfig';
import { ColumnsType } from 'antd/lib/table';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import PricesForm from './PricesForm';

function PricesTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [prices, loading, error] = useListVals<IPrice>(ref(firebaseDb, 'prices'));
  const [events] = useListVals<IEvent>(ref(firebaseDb, 'events'));

  const filteredEvents = events?.filter((event) => (
    prices?.every((val) => val.eventName !== event.eventName)
  ));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deletePrice = (e: Key) => (
    deleteDataInDb(firebaseDb, 'prices', 'key', e)
  );

  const columns: ColumnsType<IPrice> = [
    {
      title: 'Подія',
      dataIndex: 'eventName',
    },
    {
      title: 'Одномісний каяк',
      dataIndex: 'soloKayak',
    },
    {
      title: 'Двомісний каяк',
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

  const memoizedFooter = useMemo(() => (
    <Tooltip title={!filteredEvents?.length ? 'Прайси для усіх існуючих подій вже додані' : ''}>
      <Button
        type="primary"
        htmlType="button"
        onClick={showDrawer}
        disabled={!filteredEvents?.length}
      >
        Додати прайс
      </Button>
    </Tooltip>

  ), [filteredEvents?.length]);

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={prices}
        columns={columns}
        footer={() => memoizedFooter}
      />
      <Drawer
        title="Новий прайс"
        placement="bottom"
        height={300}
        onClose={closeDrawer}
        visible={isVisible}
        extra={(
          <Button
            htmlType="submit"
            type="primary"
            form="prices-form"
          >
            Додати
          </Button>
            )}
      >
        <PricesForm closeDrawer={closeDrawer} filteredEvents={filteredEvents} />
      </Drawer>
    </>
  );
}

export default PricesTable;

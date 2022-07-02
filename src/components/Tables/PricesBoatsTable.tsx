import {
  Button, Drawer, Popconfirm, Table, Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PricesBoatsForm from 'components/Forms/PricesBoatsForm';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IEvent, IPriceBoatsUI } from 'types';
import { deleteDataInDb } from 'utils/dbActions';

function PricesBoatsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [prices, loading, error] = useListVals<IPriceBoatsUI>(ref(db, 'prices'), {
    transform: (val) => ({
      ...val,
      soloKayaks: val.soloKayaks ? val.soloKayaks : '-',
      doubleKayaks: val.doubleKayaks ? val.doubleKayaks : '-',
      sups: val.sups ? val.sups : '-',
    }),
  });
  const [events] = useListVals<IEvent>(ref(db, 'events'));

  const filteredEvents = events?.filter((event) => (
    prices?.every((val) => val.eventName !== event.eventName)
  ));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deletePrice = (e: number) => (
    deleteDataInDb('prices', 'key', e)
  );

  const columns: ColumnsType<IPriceBoatsUI> = [
    {
      title: 'Подія',
      dataIndex: 'eventName',
    },
    {
      title: 'Каяки',
      children: [
        {
          title: 'Одномісний',
          dataIndex: 'soloKayaks',
        },
        {
          title: 'Двомісний',
          dataIndex: 'doubleKayaks',
        },
      ],

    },
    {
      title: 'Сап',
      dataIndex: 'sups',
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
      <Table<IPriceBoatsUI>
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
        <PricesBoatsForm closeDrawer={closeDrawer} events={filteredEvents} />
      </Drawer>
    </>
  );
}

export default PricesBoatsTable;

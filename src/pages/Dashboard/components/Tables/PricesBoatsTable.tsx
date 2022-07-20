import {
  Button, Drawer, Popconfirm, Table, Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import PricesBoatsForm from 'pages/Dashboard/components/Forms/PricesBoatsForm';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IEvent, IPriceBoatsUI } from 'types';
import { deleteDataInDb } from 'utils/dbActions';

function PricesBoatsTable() {
  const { Title } = Typography;

  const [isVisible, setIsVisible] = useState(false);
  const [prices, loading, error] = useListVals<IPriceBoatsUI>(ref(db, 'prices/boats'), {
    transform: (val) => ({
      ...val,
      soloKayak: val.soloKayak ? val.soloKayak : '-',
      doubleKayak: val.doubleKayak ? val.doubleKayak : '-',
      sup: val.sup ? val.sup : '-',
    }),
  });
  const [events] = useListVals<IEvent>(ref(db, 'events'));

  const filteredEvents = events?.filter((event) => (
    prices?.every((val) => val.eventName !== event.eventName)
  ));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteData = (record: IPriceBoatsUI) => (
    deleteDataInDb('prices/boats', 'key', record.key)
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
          dataIndex: 'soloKayak',
        },
        {
          title: 'Двомісний',
          dataIndex: 'doubleKayak',
        },
      ],

    },
    {
      title: 'Сап',
      dataIndex: 'sup',
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
          onConfirm={() => deleteData(record)}
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
      disabled={!filteredEvents?.length}
    >
      Додати прайс
    </Button>
  ), [filteredEvents?.length]);

  if (error) console.error(error);

  return (
    <>
      <Title
        className="title"
        level={2}
        style={{ marginTop: '20px' }}
      >
        Плавзасоби
      </Title>
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
            form="prices-boats-form"
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

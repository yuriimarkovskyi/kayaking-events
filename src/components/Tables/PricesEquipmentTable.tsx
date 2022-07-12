import {
  Button, Drawer, Popconfirm, Table, Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PricesEquipmentForm from 'components/Forms/PriceEquipmentForm';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IPriceEquipment } from 'types';
import { deleteDataInDb } from 'utils/dbActions';

function PricesEquipmentTable() {
  const { Title } = Typography;

  const [isVisible, setIsVisible] = useState(false);
  const [prices, loading, error] = useListVals<IPriceEquipment>(ref(db, 'prices/equipment'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deletePrice = (e: number) => (
    deleteDataInDb('prices/equipment', 'key', e)
  );

  const columns: ColumnsType<IPriceEquipment> = [
    {
      title: 'Дитяче сидіння',
      dataIndex: 'childSeat',
    },
    {
      title: 'Карбонове весло',
      dataIndex: 'carbonPaddle',
    },
    {
      title: 'Неопренова спідниця',
      dataIndex: 'neopreneSkirt',
    },
    {
      title: 'Нейлонова спідниця',
      dataIndex: 'nylonSkirt',
    },
    {
      title: 'Водонепроникний кейс',
      dataIndex: 'waterproofCase',
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
    <Button
      type="primary"
      htmlType="button"
      onClick={showDrawer}
      disabled={!!prices?.length}
    >
      Додати прайс
    </Button>
  ), [prices?.length]);

  if (error) console.error(error);

  return (
    <>
      <Title
        className="title"
        level={2}
        style={{ marginTop: '20px' }}
      >
        Спорядження
      </Title>
      <Table<IPriceEquipment>
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
            form="prices-equipment-form"
          >
            Додати
          </Button>
            )}
      >
        <PricesEquipmentForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default PricesEquipmentTable;

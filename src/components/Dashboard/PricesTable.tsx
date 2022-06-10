import React, { useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { Button, Drawer, Table } from 'antd';
import { IPrice } from 'types';
import { firebaseDb } from 'firebaseConfig';
import { pricesColumns } from 'constants/pricesColumns';
import PricesForm from './PricesForm';

function PricesTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [prices, loading, error] = useListVals<IPrice>(ref(firebaseDb, 'prices'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={prices}
        columns={pricesColumns}
            /* eslint-disable-next-line react/no-unstable-nested-components */
        footer={() => (
          <Button
            type="primary"
            htmlType="button"
            onClick={showDrawer}
          >
            Додати прайс
          </Button>
        )}
      />
      <Drawer
        title="Новий прайс"
        placement="bottom"
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
        <PricesForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default PricesTable;

import React, { useState } from 'react';
import { Button, Drawer, Table } from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { rentalStationsColumns } from 'constants/rentalStationsColumns';
import { IRentalStation } from 'types';
import { firebaseDb } from 'firebaseConfig';
import RentalStationsForm from './RentalStationsForm';

function RentalStationsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [rentalStations, loading, error] = useListVals<IRentalStation>(ref(firebaseDb, 'rentalStations'));

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
        dataSource={rentalStations}
        columns={rentalStationsColumns}
            /* eslint-disable-next-line react/no-unstable-nested-components */
        footer={() => (
          <Button
            type="primary"
            htmlType="button"
            onClick={showDrawer}
          >
            Додати станцію прокату
          </Button>
        )}
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

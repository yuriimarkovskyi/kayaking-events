import React, { useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { Button, Drawer, Table } from 'antd';
import { IEvent } from '../../types/types';
import { firebaseDb } from '../../firebase/firebase';
import EventsForm from './EventsForm';
import { eventsColumns } from '../../constants/eventsColumns';

function EventsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [events, loading, error] = useListVals<IEvent>(ref(firebaseDb, 'events'));

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
        dataSource={events}
        columns={eventsColumns}
        /* eslint-disable-next-line react/no-unstable-nested-components */
        footer={() => (
          <Button
            type="primary"
            htmlType="button"
            onClick={showDrawer}
          >
            Додати івент
          </Button>
        )}
      />
      <Drawer
        title="Новий івент"
        placement="right"
        width="600"
        onClose={closeDrawer}
        visible={isVisible}
        extra={(
          <Button
            htmlType="submit"
            type="primary"
            form="events-form"
          >
            Додати
          </Button>
            )}
      >
        <EventsForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default EventsTable;

import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { Button, Drawer, Table } from 'antd';
import { IEvent } from 'types';
import { firebaseDb } from 'firebaseConfig';
import { ColumnsType } from 'antd/lib/table';
import EventsForm from './EventsForm';

function EventsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [events, loading, error] = useListVals<IEvent>(ref(firebaseDb, 'events'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const columns: ColumnsType<IEvent> = [
    {
      title: 'Подія',
      dataIndex: 'eventName',
    },
    {
      title: 'Станція старту',
      dataIndex: 'rentalStation',
    },
    {
      title: 'Лінк',
      dataIndex: 'link',
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
    },
    {
      title: 'Опис',
      dataIndex: 'description',
    },
    {
      title: 'Обкладинка',
      dataIndex: 'imageCover',
    },
    {
      title: 'Фото для слайдеру',
      dataIndex: 'imagesSlider',
    },
    {
      title: 'Ключові особливості',
      dataIndex: 'descriptionFeatures',
    },
  ];

  const memoizedFooter = useMemo(() => (
    <Button
      type="primary"
      htmlType="button"
      onClick={showDrawer}
    >
      Додати івент
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
        dataSource={events}
        columns={columns}
        footer={() => memoizedFooter}
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

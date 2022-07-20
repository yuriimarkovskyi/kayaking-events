import { DownOutlined } from '@ant-design/icons';
import {
  Button, Drawer, Dropdown, Menu, Popconfirm, Table, Tag, Tooltip, Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import EventsForm from 'pages/Dashboard/components/Forms/EventsForm';
import EventsImagesForm from 'pages/Dashboard/components/Forms/EventsImagesForm';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IEvent } from 'types';
import { deleteDataInDb, updateDataInDb } from 'utils/dbActions';

function EventsTable() {
  const { Text } = Typography;

  const [isVisiblePrimary, setIsVisiblePrimary] = useState(false);
  const [isVisibleSecondary, setIsVisibleSecondary] = useState(false);

  const [events, loading, error] = useListVals<IEvent>(ref(db, 'events'));

  const showDrawerPrimary = () => setIsVisiblePrimary(true);
  const showDrawerSecondary = () => setIsVisibleSecondary(true);
  const closeDrawer = () => {
    if (isVisiblePrimary) setIsVisiblePrimary(false);
    if (isVisibleSecondary) setIsVisibleSecondary(false);
  };

  const updateData = (record: IEvent) => (
    updateDataInDb('events', 'key', {
      isPublished: !record.isPublished,
    }, record.key)
  );

  const deleteData = (record: IEvent) => (
    deleteDataInDb('events', 'key', record.key)
  );

  const columns: ColumnsType<IEvent> = [
    {
      title: 'Подія',
      dataIndex: 'eventName',
    },
    {
      title: 'Категорія',
      dataIndex: 'categoryName',
    },
    {
      title: 'Станція проведення',
      dataIndex: 'rentalStation',
    },
    {
      title: 'Лінк',
      dataIndex: 'link',
    },
    {
      title: 'Карта машруту',
      dataIndex: 'routeMap',
      ellipsis: true,
      render: (value) => (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ),
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
    },
    {
      title: 'Опис',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: 'Особливості',
      dataIndex: 'features',
      ellipsis: {
        showTitle: false,
      },
      render: (features) => (
        <ul style={{ listStyle: 'circle', paddingLeft: '15px' }}>
          {features.map((feature: string, index: number) => (
            <li key={feature + index.toString()}>
              <Tooltip placement="topLeft" title={feature}>
                {feature}
              </Tooltip>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Доступні плавзасоби',
      render: (value) => (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '5px',
        }}
        >
          {value.availableBoats.soloKayaks && (
            <Tag color="blue">
              Одномісні каяки
            </Tag>
          )}
          {value.availableBoats.doubleKayaks && (
            <Tag color="geekblue">
              Двомісні каяки
            </Tag>
          )}
          {value.availableBoats.sups && (
            <Tag color="cyan">
              Сапи
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Обкладинка',
      dataIndex: 'cover',
      ellipsis: true,
      render: (value) => (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'isPublished',
      render: (value) => (
        <Text type={value ? 'success' : 'danger'}>
          {value ? 'Опубліковано' : 'Не опубліковано'}
        </Text>
      ),
    },
    {
      title: 'Дії',
      dataIndex: 'actions',
      render: (_, record) => (
        <Dropdown
          placement="topLeft"
          arrow={{
            pointAtCenter: true,
          }}
          overlay={(
            <Menu
              items={[
                {
                  key: '1',
                  label: (
                    <Button
                      type="dashed"
                      block
                      onClick={() => updateData(record)}
                    >
                      {
                        record.isPublished ? 'Прибрати з публікації' : 'Опублікувати'
                      }
                    </Button>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <Popconfirm
                      placement="left"
                      title="Ви впевнені?"
                      okText="Так"
                      cancelText="Ні"
                      onConfirm={() => deleteData(record)}
                    >
                      <Button type="dashed" block danger>
                        Видалити
                      </Button>
                    </Popconfirm>
                  ),
                },
              ]}
            />
          )}
        >
          <Button type="dashed">
            Список дій
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const memoizedFooter = useMemo(() => (
    <>
      <Button
        type="primary"
        htmlType="button"
        onClick={showDrawerPrimary}
        style={{ marginRight: '10px' }}
      >
        Додати подію
      </Button>
      <Button
        type="primary"
        htmlType="button"
        onClick={showDrawerSecondary}
        disabled={!events?.length}
      >
        Додати зображення
      </Button>
    </>
  ), [events?.length]);

  if (error) console.error(error);

  return (
    <>
      <Table<IEvent>
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={events}
        columns={columns}
        footer={() => memoizedFooter}
      />
      <Drawer
        title={isVisiblePrimary ? 'Нова подія' : 'Додати зображення'}
        placement="right"
        width="600"
        onClose={closeDrawer}
        visible={isVisiblePrimary || isVisibleSecondary}
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
        {isVisiblePrimary
          ? <EventsForm closeDrawer={closeDrawer} />
          : <EventsImagesForm closeDrawer={closeDrawer} />}
      </Drawer>
    </>
  );
}

export default EventsTable;

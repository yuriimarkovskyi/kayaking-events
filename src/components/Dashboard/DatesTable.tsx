import React, { Key, useMemo, useState } from 'react';
import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { firebaseDb } from 'firebaseConfig';
import { IDateTransformed } from 'types';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import { isEqual, uniqWith } from 'lodash';
import DatesForm from './DatesForm';

function DatesTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [dates, loading, error] = useListVals<IDateTransformed>(ref(firebaseDb, 'dates'), {
    transform: (val) => ({
      ...val,
      date: moment.unix(val.date).locale('uk').format('L'),
    }),
  });

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteDate = (e: Key) => (
    deleteDataInDb(firebaseDb, 'dates', 'key', e)
  );

  const columns: ColumnsType<IDateTransformed> = [
    {
      title: 'Подія',
      dataIndex: 'eventName',
      filters: uniqWith(dates?.map((val) => ({
        text: val.eventName,
        value: val.eventName,
      })), isEqual),
      onFilter: (value, record) => record.eventName.includes(value as string),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      sortDirections: ['ascend', 'descend', 'ascend'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.key as number) - (b.key as number),
    },
    {
      title: 'Загальна кількість каяків',
      children: [
        {
          title: 'Одномісних',
          render: (value) => (
            <span>
              {value.totalPlaces.soloKayaks}
            </span>
          ),
        },
        {
          title: 'Двомісних',
          render: (value) => (
            <span>
              {value.totalPlaces.doubleKayaks}
            </span>
          ),
        },
      ],
    },
    {
      title: 'Доступно каяків',
      children: [
        {
          title: 'Одномісних',
          render: (value) => (
            <span>
              {value.freePlaces.soloKayaks}
            </span>
          ),
        },
        {
          title: 'Двомісних',
          render: (value) => (
            <span>
              {value.freePlaces.doubleKayaks}
            </span>
          ),
        },
      ],
    },
    {
      title: 'Інструктор',
      dataIndex: 'instructor',
      filters: uniqWith(dates?.map((val) => ({
        text: val.instructor,
        value: val.instructor,
      })), isEqual),
      onFilter: (value, record) => record.instructor.includes(value as string),
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
          onConfirm={() => deleteDate(record.key)}
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
      Додати дату
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
        dataSource={dates}
        columns={columns}
        footer={() => memoizedFooter}
      />
      <Drawer
        title="Нова дата"
        placement="bottom"
        onClose={closeDrawer}
        visible={isVisible}
        extra={(
          <Button
            htmlType="submit"
            type="primary"
            form="dates-form"
          >
            Додати
          </Button>
                )}
      >
        <DatesForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default DatesTable;

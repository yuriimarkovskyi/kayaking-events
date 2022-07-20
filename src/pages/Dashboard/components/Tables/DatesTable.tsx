import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import { isEqual, uniqWith } from 'lodash';
import moment from 'moment';
import DatesForm from 'pages/Dashboard/components/Forms/DatesForm';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IDateUI } from 'types';
import { deleteDataInDb } from 'utils/dbActions';

function DatesTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [dates, loading, error] = useListVals<IDateUI>(ref(db, 'dates'), {
    transform: (val) => ({
      ...val,
      date: moment.unix(val.date).locale('uk').format('L'),
    }),
  });

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteData = (record: IDateUI) => (
    deleteDataInDb('dates', 'key', record.key)
  );

  const columns: ColumnsType<IDateUI> = [
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
    },
    {
      title: 'Загальна кількість плавзасобів',
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
        {
          title: 'Сапів',
          render: (value) => (
            <span>
              {value.totalPlaces.sups}
            </span>
          ),
        },
      ],
    },
    {
      title: 'Доступна кількість плавзасобів',
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
        {
          title: 'Сапів',
          render: (value) => (
            <span>
              {value.totalPlaces.sups}
            </span>
          ),
        },
      ],
    },
    {
      title: 'Доступна кількість спорядження',
      children: [
        {
          title: 'Дитячих сидінь',
          render: (value) => (
            <span>
              {value.freeEquipment.childSeats}
            </span>
          ),
        },
        {
          title: 'Карбонових весел',
          render: (value) => (
            <span>
              {value.freeEquipment.carbonPaddles}
            </span>
          ),
        },
        {
          title: 'Спідниць',
          children: [
            {
              title: 'Неопренових',
              render: (value) => (
                <span>
                  {value.freeEquipment.neopreneSkirts}
                </span>
              ),
            },
            {
              title: 'Нейлонових',
              render: (value) => (
                <span>
                  {value.freeEquipment.nylonSkirts}
                </span>
              ),
            },
          ],
        },
        {
          title: 'Водонепроникних кейсів',
          render: (value) => (
            <span>
              {value.freeEquipment.waterproofCases}
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
    >
      Додати дату
    </Button>
  ), []);

  if (error) console.error(error);

  return (
    <>
      <Table<IDateUI>
        size="small"
        bordered
        scroll={{ x: true }}
        pagination={false}
        loading={loading}
        dataSource={dates}
        columns={columns}
        footer={() => memoizedFooter}
      />
      <Drawer
        title="Нова дата"
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

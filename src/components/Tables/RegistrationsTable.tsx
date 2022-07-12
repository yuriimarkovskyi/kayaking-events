import 'moment/locale/uk';

import { DownOutlined } from '@ant-design/icons';
import {
  Badge, Button, Dropdown, Menu, Popconfirm, Table, Tag,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import { isEqual, uniqWith } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ICustomerUI } from 'types';
import { deleteDataInDb, updateDataInDb } from 'utils/dbActions';

function RegistrationsTable() {
  const [registrationsValues, loading, error] = useListVals<ICustomerUI>(ref(db, 'registrations'), {
    transform: (val) => ({
      ...val,
      registrationTime: moment(val.registrationTime)
        .startOf('seconds')
        .fromNow(),
      eventDate: moment.unix(val.eventDate)
        .locale('uk')
        .format('L'),
      fullName: val.customerData.fullName,
      email: val.customerData.email,
      phone: `+380${val.customerData.phone}`,
      soloKayaks: val.boatsData.soloKayaks
        ? val.boatsData.soloKayaks
        : undefined,
      doubleKayaks: val.boatsData.doubleKayaks
        ? val.boatsData.doubleKayaks
        : undefined,
      sups: val.boatsData.sups
        ? val.boatsData.sups
        : undefined,
      childSeats: val.equipmentData.childSeats
        ? val.equipmentData.childSeats
        : undefined,
      carbonPaddles: val.equipmentData.carbonPaddles
        ? val.equipmentData.carbonPaddles
        : undefined,
      neopreneSkirts: val.equipmentData.neopreneSkirts
        ? val.equipmentData.neopreneSkirts
        : undefined,
      nylonSkirts: val.equipmentData.nylonSkirts
        ? val.equipmentData.nylonSkirts
        : undefined,
      waterproofCases: val.equipmentData.waterproofCases
        ? val.equipmentData.waterproofCases
        : undefined,
    }),
  });

  const updateIsCompleted = (e: number) => (
    updateDataInDb('registrations', 'key', { isCompleted: true }, e)
  );

  const updateIsRejected = (e: number) => updateDataInDb('registrations', 'key', {
    isCompleted: false,
    isRejected: true,
  }, e);

  const deleteRegistration = (e: number) => (
    deleteDataInDb('registrations', 'key', e)
  );

  const columns: ColumnsType<ICustomerUI> = [
    {
      title: 'Подія',
      dataIndex: 'eventName',
      fixed: 'left',
      filters: uniqWith(registrationsValues?.map((val) => ({
        text: val.eventName,
        value: val.eventName,
      })), isEqual),
      onFilter: (value, record) => record.eventName.includes(value as string),
      render: (value, record) => {
        if (record.isCompleted) {
          return (
            <Badge dot status="success">
              {value}
            </Badge>
          );
        }
        if (record.isRejected) {
          return (
            <Badge dot status="error">
              {value}
            </Badge>
          );
        }
        return (
          <Badge dot status="default">
            {value}
          </Badge>
        );
      },
    },
    {
      title: 'Зареєстровано',
      dataIndex: 'registrationTime',
      sortDirections: ['ascend', 'descend', 'ascend'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Дата',
      dataIndex: 'eventDate',
      filters: uniqWith(registrationsValues?.map((val) => ({
        text: val.eventDate,
        value: val.eventDate,
      })), isEqual),
      onFilter: (value, record) => record.eventDate.includes(value as string),
    },
    {
      title: 'Дані клієнта',
      children: [
        {
          title: 'ПІБ',
          render: (value) => (
            <a href={`tel:${value.fullName}`}>
              {value.fullName}
            </a>
          ),
        },
        {
          title: 'Email',
          render: (value) => (
            <a href={`tel:${value.email}`}>
              {value.email}
            </a>
          ),
        },
        {
          title: 'Номер телефону',
          render: (value) => (
            <a href={`tel:${value.phone}`}>
              {value.phone}
            </a>
          ),
        },
      ],
    },
    {
      title: 'Плавзасоби',
      render: (value) => (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '5px',
        }}
        >
          {value.soloKayaks && (
            <Tag color="blue">
              Одномісні каяки
            </Tag>
          )}
          {value.doubleKayaks && (
            <Tag color="geekblue">
              Двомісні каяки
            </Tag>
          )}
          {value.sups && (
            <Tag color="cyan">
              Сапи
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Кількість плавзасобів',
      children: [
        {
          title: 'Каяки',
          children: [
            {
              title: 'Одномісні',
              dataIndex: 'soloKayaks',
            },
            {
              title: 'Двомісні',
              dataIndex: 'doubleKayaks',
            },
          ],
        },
        {
          title: 'Сапи',
          dataIndex: 'sups',
        },
      ],
    },
    {
      title: 'Спорядження',
      render: (value) => (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '5px',
        }}
        >
          {value.childSeats && (
            <Tag color="gold">
              Дитячі сидіння
            </Tag>
          )}
          {value.carbonPaddles && (
            <Tag color="magenta">
              Карбонові весла
            </Tag>
          )}
          {(value.neopreneSkirts || value.nylonSkirts) && (
            <Tag color="cyan">
              Cпідниці
            </Tag>
          )}
          {value.waterproofCases && (
            <Tag color="green">
              Водонепроникні кейси
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Кількість спорядження',
      children: [
        {
          title: 'Дитячі сидіння',
          dataIndex: 'childSeats',
        },
        {
          title: 'Карбонові весла',
          dataIndex: 'carbonPaddles',
        },
        {
          title: 'Спідниці',
          children: [
            {
              title: 'Неопренові',
              dataIndex: 'neopreneSkirts',
            },
            {
              title: 'Нейлонові',
              dataIndex: 'nylonSkirts',
            },
          ],
        },
        {
          title: 'Водонепроникні кейси',
          dataIndex: 'waterproofCases',
        },
      ],
    },
    {
      title: 'До сплати',
      dataIndex: 'amount',
    },
    {
      title: 'Нотатки',
      dataIndex: 'notes',
      ellipsis: true,
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (value) => (
        <Dropdown
          placement="topLeft"
          arrow={{
            pointAtCenter: true,
          }}
          overlay={(
            <Menu
              items={[
                !value.isCompleted && !value.isRejected
                  ? {
                    key: '1',
                    label: (
                      <Button
                        type="dashed"
                        block
                        onClick={() => updateIsCompleted(value.key)}
                      >
                        Узгоджено
                      </Button>
                    ),
                  } : null,
                !value.isRejected
                  ? {
                    key: '2',
                    label: (
                      <Button
                        type="dashed"
                        block
                        onClick={() => updateIsRejected(value.key)}
                      >
                        Скасовано
                      </Button>
                    ),
                  } : null,
                {
                  key: '3',
                  label: (
                    <Popconfirm
                      placement="left"
                      title="Ви впевнені?"
                      okText="Так"
                      cancelText="Ні"
                      onConfirm={() => deleteRegistration(value.key)}
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

  if (error) console.error(error);

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      scroll={{ x: true }}
      loading={loading}
      dataSource={registrationsValues}
      columns={columns}
    />
  );
}

export default RegistrationsTable;

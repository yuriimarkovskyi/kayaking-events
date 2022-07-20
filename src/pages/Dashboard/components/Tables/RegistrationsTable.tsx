import 'moment/locale/uk';

import { DownOutlined } from '@ant-design/icons';
import {
  Button, Dropdown, Menu, Popconfirm, Space,
  Table, Tag, Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import { isEqual, uniqWith } from 'lodash';
import moment from 'moment';
import React from 'react';
import { CSVLink } from 'react-csv';
import { useListVals } from 'react-firebase-hooks/database';
import { ICustomerUI } from 'types';
import { deleteDataInDb, updateDataInDb } from 'utils/dbActions';

function RegistrationsTable() {
  const { Text } = Typography;

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

  const updateIsCompleted = (record: ICustomerUI) => (
    updateDataInDb('registrations', 'key', {
      isCompleted: true,
    }, record.key)
  );

  const updateIsRejected = (record: ICustomerUI) => updateDataInDb('registrations', 'key', {
    isCompleted: false,
    isRejected: true,
  }, record.key);

  const deleteData = (record: ICustomerUI) => (
    deleteDataInDb('registrations', 'key', record.key)
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
    },
    {
      title: 'Статус',
      fixed: 'left',
      ellipsis: true,
      render: (_, record) => {
        if (record.isCompleted) {
          return (
            <Text type="success">
              Узгоджено
            </Text>
          );
        }
        if (record.isRejected) {
          return (
            <Text type="danger">
              Скасовано
            </Text>
          );
        }
        return (
          <Text>
            New
          </Text>
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
        <Space direction="vertical">
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
        </Space>
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
        <Space direction="vertical">
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
        </Space>
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
      title: 'Вартість',
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
      render: (value, record) => (
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
                        onClick={() => updateIsCompleted(record)}
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
                        onClick={() => updateIsRejected(record)}
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

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        scroll={{ x: true }}
        loading={loading}
        dataSource={registrationsValues}
        columns={columns}
      />
      <CSVLink data={registrationsValues!}>Download me</CSVLink>
    </>
  );
}

export default RegistrationsTable;

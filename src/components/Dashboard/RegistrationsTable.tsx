import React, { Key } from 'react';
import {
  Badge, Button, Dropdown, Menu, Popconfirm, Table, Tag,
} from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { firebaseDb } from 'firebaseConfig';
import { ICustomerTransformed } from 'types';
import { ColumnsType } from 'antd/lib/table';
import { DownOutlined } from '@ant-design/icons';
import { updateDataInDb } from 'helpers/updateDataInDb';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import { isEqual, uniqWith } from 'lodash';

function RegistrationsTable() {
  const [registrationsValues, loading, error] = useListVals<ICustomerTransformed>(ref(firebaseDb, 'registrations'), {
    transform: (val) => ({
      ...val,
      registrationTime: moment(val.registrationTime).startOf('seconds').fromNow(),
      phone: `+380${val.phone}`,
      eventDate: moment.unix(val.eventDate).locale('uk').format('L'),
      soloKayaks: val.soloKayaks ? val.soloKayaks : '-',
      doubleKayaks: val.doubleKayaks ? val.doubleKayaks : '-',
      isChildren: val.isChildren ? 'Так' : 'Ні',
      childrenAmount: val.childrenAmount ? val.childrenAmount : '-',
    }),
  });

  const updateIsCompleted = (e: Key) => (
    updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: true }, e)
  );

  const updateIsRejected = (e: Key) => (
    updateDataInDb(firebaseDb, 'registrations', 'key', { isCompleted: false, isRejected: true }, e)
  );

  const deleteRegistration = (e: Key) => (
    deleteDataInDb(firebaseDb, 'registrations', 'key', e)
  );

  const columns: ColumnsType<ICustomerTransformed> = [
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
      sorter: (a, b) => (a.key as number) - (b.key as number),
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
          dataIndex: 'fullName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          render: (email) => (
            <a href={`mailto:${email}`}>
              {email}
            </a>
          ),
        },
        {
          title: 'Номер телефону',
          dataIndex: 'phone',
          render: (phone) => (
            <a href={`tel:${phone}`}>
              {phone}
            </a>
          ),
        },
      ],
    },
    {
      title: 'Каяки',
      children: [
        {
          title: '|',
          dataIndex: 'soloKayaks',
        },
        {
          title: 'X',
          dataIndex: 'doubleKayaks',
        },
      ],
    },
    {
      title: 'Діти',
      dataIndex: 'isChildren',
      render: (tag) => (
        <Tag key={tag}>
          {tag}
        </Tag>
      ),
    },
    {
      title: 'Кількість дітей',
      dataIndex: 'childrenAmount',
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

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
      eventName: val.eventData.eventName,
      eventDate: moment.unix(val.eventData.eventDate)
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
      title: '??????????',
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
      title: '??????????????????????????',
      dataIndex: 'registrationTime',
      sortDirections: ['ascend', 'descend', 'ascend'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: '????????',
      dataIndex: 'eventDate',
      filters: uniqWith(registrationsValues?.map((val) => ({
        text: val.eventDate,
        value: val.eventDate,
      })), isEqual),
      onFilter: (value, record) => record.eventDate.includes(value as string),
    },
    {
      title: '???????? ??????????????',
      children: [
        {
          title: '??????',
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
          title: '?????????? ????????????????',
          render: (value) => (
            <a href={`tel:${value.phone}`}>
              {value.phone}
            </a>
          ),
        },
      ],
    },
    {
      title: '????????????????????',
      render: (value) => (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '5px',
        }}
        >
          {value.soloKayaks && (
            <Tag color="blue">
              ?????????????????? ??????????
            </Tag>
          )}
          {value.doubleKayaks && (
            <Tag color="geekblue">
              ???????????????? ??????????
            </Tag>
          )}
          {value.sups && (
            <Tag color="cyan">
              ????????
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '?????????????????? ??????????????????????',
      children: [
        {
          title: '??????????',
          children: [
            {
              title: '??????????????????',
              dataIndex: 'soloKayaks',
            },
            {
              title: '????????????????',
              dataIndex: 'doubleKayaks',
            },
          ],
        },
        {
          title: '????????',
          dataIndex: 'sups',
        },
      ],
    },
    {
      title: '??????????????????????',
      render: (value) => (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '5px',
        }}
        >
          {value.childSeats && (
            <Tag color="gold">
              ???????????? ??????????????
            </Tag>
          )}
          {value.carbonPaddles && (
            <Tag color="magenta">
              ?????????????????? ??????????
            </Tag>
          )}
          {(value.neopreneSkirts || value.nylonSkirts) && (
            <Tag color="cyan">
              C??????????????
            </Tag>
          )}
          {value.waterproofCases && (
            <Tag color="green">
              ???????????????????????????? ??????????
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '?????????????????? ??????????????????????',
      children: [
        {
          title: '???????????? ??????????????',
          dataIndex: 'childSeats',
        },
        {
          title: '?????????????????? ??????????',
          dataIndex: 'carbonPaddles',
        },
        {
          title: '????????????????',
          children: [
            {
              title: '????????????????????',
              dataIndex: 'neopreneSkirts',
            },
            {
              title: '??????????????????',
              dataIndex: 'nylonSkirts',
            },
          ],
        },
        {
          title: '???????????????????????????? ??????????',
          dataIndex: 'waterproofCases',
        },
      ],
    },
    {
      title: '???? ????????????',
      dataIndex: 'amount',
    },
    {
      title: '??????????????',
      dataIndex: 'notes',
      ellipsis: true,
    },
    {
      title: '??????',
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
                        ??????????????????
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
                        ??????????????????
                      </Button>
                    ),
                  } : null,
                {
                  key: '3',
                  label: (
                    <Popconfirm
                      placement="left"
                      title="???? ?????????????????"
                      okText="??????"
                      cancelText="????"
                      onConfirm={() => deleteRegistration(value.key)}
                    >
                      <Button type="dashed" block danger>
                        ????????????????
                      </Button>
                    </Popconfirm>
                  ),
                },
              ]}
            />
          )}
        >
          <Button type="dashed">
            ???????????? ??????
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

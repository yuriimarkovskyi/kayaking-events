import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { useSelector } from 'react-redux';
import { columns, dataSource } from '../helpers/registrationsData';
import { uniqObjectsByKey } from '../helpers/uniqObjectsByKey';

function AdminRegistrations() {
  const registrations = useSelector((state) => state.registrations.registrations);
  const uniqEventRegistrations = uniqObjectsByKey(registrations, 'eventName');
  const eventTableColumn = columns.filter((el) => el.dataIndex === 'eventName');

  uniqEventRegistrations.forEach((el) => {
    eventTableColumn.map((item) => item.filters.push({
      text: el.eventName,
      value: el.eventName,
    }));
  });

  registrations.forEach((el) => {
    dataSource.push({
      ...el,
      registrationTime: moment(el.registrationTime).startOf('seconds').fromNow(),
      eventDate: moment().locale('uk').format('LL'),
      soloKayaks: el.soloKayaks ? el.soloKayaks : '-',
      doubleKayaks: el.doubleKayaks ? el.doubleKayaks : '-',
      isChildren: el.isChildren ? 'Так' : '',
      childrenAmount: el.childrenAmount ? el.childrenAmount : '-',
    });
  });

  return (
    <Table
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      size="small"
      scroll={{ x: true }}
    />
  );
}

export default AdminRegistrations;

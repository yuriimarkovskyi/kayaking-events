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
      numberOfSoloKayaks: el.numberOfSoloKayaks === 0 ? '-' : el.numberOfSoloKayaks,
      numberOfDoubleKayaks: el.numberOfDoubleKayaks === 0 ? '-' : el.numberOfDoubleKayaks,
    });
  });

  return (
    <Table
      rowKey="id"
      locale="uk"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: true }}
    />
  );
}

export default AdminRegistrations;

import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { useSelector } from 'react-redux';
import { registrationsColumns, registrationsData } from '../constants/tablesData';
import { uniqObjectsByKey } from '../helpers/uniqObjectsByKey';

function Registrations() {
  const registrations = useSelector((state) => state.registrations.registrations);
  const uniqEventRegistrations = uniqObjectsByKey(registrations, 'eventName');
  const eventTableColumn = registrationsColumns.filter((el) => el.dataIndex === 'eventName');

  uniqEventRegistrations.forEach((el) => {
    eventTableColumn.map((item) => item.filters.push({
      text: el.eventName,
      value: el.eventName,
    }));
  });

  if (!registrationsData.length) {
    registrations.forEach((el) => {
      registrationsData.push({
        ...el,
        registrationTime: moment(el.registrationTime).startOf('seconds').fromNow(),
        eventDate: moment().locale('uk').format('LL'),
        soloKayaks: el.soloKayaks ? el.soloKayaks : '-',
        doubleKayaks: el.doubleKayaks ? el.doubleKayaks : '-',
        isChildren: el.isChildren ? 'Так' : '',
        childrenAmount: el.childrenAmount ? el.childrenAmount : '-',
      });
    });
  }

  return (
    <Table
      rowKey="id"
      dataSource={registrationsData}
      columns={registrationsColumns}
      pagination={false}
      size="small"
      scroll={{ x: true }}
    />
  );
}

export default Registrations;

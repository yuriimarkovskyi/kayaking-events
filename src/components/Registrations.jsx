import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { registrationsColumns } from '../constants/tablesData';
import { firebaseDatabase } from '../firebase/firebase';
import { filterTableColumn } from '../helpers/filterTableColumn';

function Registrations() {
  const [registrations, loading, error] = useListVals(ref(firebaseDatabase, 'registrations'), {
    transform: (el) => ({
      ...el,
      phone: `+380${el.phone}`,
      registrationTime: moment(el.registrationTime).startOf('seconds').fromNow(),
      eventDate: moment.unix(el.eventDate).locale('uk').format('L'),
      soloKayaks: el.soloKayaks ? el.soloKayaks : '-',
      doubleKayaks: el.doubleKayaks ? el.doubleKayaks : '-',
      isChildren: el.isChildren ? 'Так' : false,
      childrenAmount: el.childrenAmount ? el.childrenAmount : '-',
    }),
  });

  filterTableColumn(registrations, 'eventName', registrationsColumns);
  filterTableColumn(registrations, 'eventDate', registrationsColumns);

  if (error) console.error(error);

  return (
    <Table
      dataSource={registrations}
      columns={registrationsColumns}
      loading={loading}
      pagination={false}
      size="small"
      scroll={{ x: true }}
    />
  );
}

export default Registrations;

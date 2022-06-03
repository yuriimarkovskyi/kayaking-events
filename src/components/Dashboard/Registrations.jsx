import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { firebaseDb } from '../../firebase/firebase';
import { filtersInColumnsTable } from '../../helpers/filtersInColumnsTable';
import { registrationsColumns } from '../../constants/tableColumns';

function Registrations() {
  const [registrationsValues, loading, error] = useListVals(ref(firebaseDb, 'registrations'), {
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

  filtersInColumnsTable(registrationsValues, 'eventName', registrationsColumns);
  filtersInColumnsTable(registrationsValues, 'eventDate', registrationsColumns);

  if (error) console.error(error);

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      scroll={{ x: true }}
      loading={loading}
      dataSource={registrationsValues}
      columns={registrationsColumns}
    />
  );
}

export default Registrations;

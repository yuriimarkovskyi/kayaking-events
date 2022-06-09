import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { firebaseDb } from '../../firebase/firebase';
import { useFilter } from '../../hooks/useFilter';
import { ICustomerTransformed } from '../../types/types';
import { registrationsColumns } from '../../constants/registrationsColumns';

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

  useFilter(registrationsValues, 'dataIndex', 'eventName', registrationsColumns);
  useFilter(registrationsValues, 'dataIndex', 'eventDate', registrationsColumns);

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

export default RegistrationsTable;

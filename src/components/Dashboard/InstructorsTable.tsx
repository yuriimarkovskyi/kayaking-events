import React, { useState } from 'react';
import { Button, Drawer, Table } from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { firebaseDb } from 'firebaseConfig';
import { IInstructor } from 'types';
import { instructorsColumns } from 'constants/instructorsColumns';
import InstructorsForm from './InstructorsForm';

function InstructorsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [instructors, loading, error] = useListVals<IInstructor>(ref(firebaseDb, 'instructors'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={instructors}
        columns={instructorsColumns}
        /* eslint-disable-next-line react/no-unstable-nested-components */
        footer={() => (
          <Button
            type="primary"
            htmlType="button"
            onClick={showDrawer}
          >
            Додати інструктора
          </Button>
        )}
      />
      <Drawer
        title="Новий інструктор"
        placement="bottom"
        onClose={closeDrawer}
        visible={isVisible}
        extra={(
          <Button
            htmlType="submit"
            type="primary"
            form="instructors-form"
          >
            Додати
          </Button>
          )}
      >
        <InstructorsForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default InstructorsTable;

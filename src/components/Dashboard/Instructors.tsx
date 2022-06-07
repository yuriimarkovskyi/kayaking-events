import React from 'react';
import { Button, Drawer, Table } from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { instructorsColumns } from '../../constants/tableColumns';
import { changeVisibility } from '../../store/visibilitySlice';
import InstructorsForm from './InstructorsForm';
import { firebaseDb } from '../../firebase/firebase';
import { IInstructor } from '../../types/types';

function Instructors(): JSX.Element {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.visibility);

  const [instructorsValues, loading, error] = useListVals<IInstructor>(ref(firebaseDb, 'instructors'));

  const showDrawer = () => {
    dispatch(changeVisibility());
  };

  const closeDrawer = () => {
    dispatch(changeVisibility());
  };

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={instructorsValues}
        columns={instructorsColumns}
        /* eslint-disable-next-line react/no-unstable-nested-components */
        footer={() => (
          <Button
            type="primary"
            htmlType="button"
            onClick={showDrawer}
          >
            Додати
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
        <InstructorsForm />
      </Drawer>
    </>
  );
}

export default Instructors;

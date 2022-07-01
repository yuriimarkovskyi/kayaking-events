import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IInstructor } from 'types';
import { deleteDataInDb } from 'utils/dbActions';

import InstructorsForm from '../Forms/InstructorsForm';

function InstructorsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [instructors, loading, error] = useListVals<IInstructor>(ref(db, 'instructors'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteInstructor = (e: number) => (
    deleteDataInDb('instructors', 'key', e)
  );

  const columns: ColumnsType<IInstructor> = [
    {
      title: 'ПІБ',
      dataIndex: 'name',
    },
    {
      title: 'Соціальні мережі',
      children: [
        {
          title: 'Facebook',
          render: (value) => (
            <a href={value?.links?.facebook} target="_blank" rel="noreferrer">
              {value?.links?.facebook}
            </a>
          ),
        },
        {
          title: 'Instagram',
          render: (value) => (
            <a href={value?.links?.instagram} target="_blank" rel="noreferrer">
              {value?.links?.instagram}
            </a>
          ),
        },
      ],
    },
    {
      title: 'Дії',
      dataIndex: 'actions',
      render: (_, record) => (
        <Popconfirm
          placement="left"
          title="Ви впевнені?"
          okText="Так"
          cancelText="Ні"
          onConfirm={() => deleteInstructor(record.key)}
        >
          <Button block danger>
            Видалити
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const memoizedFooter = useMemo(() => (
    <Button
      type="primary"
      htmlType="button"
      onClick={showDrawer}
    >
      Додати інструктора
    </Button>
  ), []);

  if (error) console.error(error);

  return (
    <>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={instructors}
        columns={columns}
        footer={() => memoizedFooter}
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

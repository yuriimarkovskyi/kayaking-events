import React, { Key, useMemo, useState } from 'react';
import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { firebaseDb } from 'firebaseConfig';
import { IInstructor } from 'types';
import { ColumnsType } from 'antd/lib/table';
import { deleteDataInDb } from 'helpers/deleteDataInDb';
import InstructorsForm from './InstructorsForm';

function InstructorsTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [instructors, loading, error] = useListVals<IInstructor>(ref(firebaseDb, 'instructors'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteInstructor = (e: Key) => (
    deleteDataInDb(firebaseDb, 'instructors', 'key', e)
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

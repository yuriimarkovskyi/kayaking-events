import {
  Button, Drawer, Popconfirm, Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db, storage } from 'config/firebase';
import { ref as db_ref } from 'firebase/database';
import { deleteObject, ref as storage_ref } from 'firebase/storage';
import React, { useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ICategory } from 'types';
import { deleteDataInDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';

import CategoriesForm from '../Forms/CategoriesForm';

function EventsTable() {
  const [isVisible, setIsVisible] = useState(false);

  const [categories, loading, error] = useListVals<ICategory>(db_ref(db, 'categories'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const deleteCategory = (e: ICategory) => {
    const coverRef = storage_ref(storage, `images/categories/covers/${e.link}/${e.categoryName}`);

    deleteObject(coverRef)
      .catch((err) => {
        console.error(err);
      });
    deleteDataInDb('categories', 'key', e.key)
      .then(() => {
        messageSuccess('Запис видалений');
      });
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: 'Категорія',
      dataIndex: 'categoryName',
    },
    {
      title: 'Лінк',
      dataIndex: 'link',
    },
    {
      title: 'Обкладинка',
      dataIndex: 'coverName',
      ellipsis: true,
      render: (value) => (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ),
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
          onConfirm={() => deleteCategory(record)}
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
      style={{ marginRight: '10px' }}
    >
      Додати категорію
    </Button>
  ), [categories?.length]);

  if (error) console.error(error);

  return (
    <>
      <Table<ICategory>
        size="small"
        bordered
        pagination={false}
        loading={loading}
        dataSource={categories}
        columns={columns}
        footer={() => memoizedFooter}
      />
      <Drawer
        title="Нова категорія"
        onClose={closeDrawer}
        visible={isVisible}
        extra={(
          <Button
            htmlType="submit"
            type="primary"
            form="categories-form"
          >
            Додати
          </Button>
        )}
      >
        <CategoriesForm closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

export default EventsTable;

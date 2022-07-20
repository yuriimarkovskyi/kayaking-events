import { DownOutlined } from '@ant-design/icons';
import {
  Button, Drawer, Dropdown, Menu, Popconfirm, Table, Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { db, storage } from 'config/firebase';
import { ref as db_ref } from 'firebase/database';
import { deleteObject, ref as storage_ref } from 'firebase/storage';
import CategoriesForm from 'pages/Dashboard/components/Forms/CategoriesForm';
import React, { memo, useMemo, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ICategory } from 'types';
import { deleteDataInDb, updateDataInDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';

function CategoriesTable() {
  const { Text } = Typography;

  const [isVisible, setIsVisible] = useState(false);

  const [categories, loading, error] = useListVals<ICategory>(db_ref(db, 'categories'));

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const updateData = (record: ICategory) => (
    updateDataInDb('categories', 'key', {
      isPublished: !record.isPublished,
    }, record.key)
  );

  const deleteData = (record: ICategory) => {
    const coverRef = storage_ref(storage, `images/categories/covers/${record.link}/${record.categoryName}`);

    deleteObject(coverRef)
      .catch((err) => {
        console.error(err);
      });
    deleteDataInDb('categories', 'key', record.key)
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
      title: 'Статус',
      dataIndex: 'isPublished',
      render: (value) => (
        <Text type={value ? 'success' : 'danger'}>
          {value ? 'Опубліковано' : 'Не опубліковано'}
        </Text>
      ),
    },
    {
      title: 'Дії',
      dataIndex: 'actions',
      render: (_, record) => (
        <Dropdown
          placement="topLeft"
          arrow={{
            pointAtCenter: true,
          }}
          overlay={(
            <Menu
              items={[
                {
                  key: '1',
                  label: (
                    <Button
                      type="dashed"
                      block
                      onClick={() => updateData(record)}
                    >
                      {
                        record.isPublished ? 'Прибрати з публікації' : 'Опублікувати'
                      }
                    </Button>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <Popconfirm
                      placement="left"
                      title="Ви впевнені?"
                      okText="Так"
                      cancelText="Ні"
                      onConfirm={() => deleteData(record)}
                    >
                      <Button type="dashed" block danger>
                        Видалити
                      </Button>
                    </Popconfirm>
                  ),
                },
              ]}
            />
          )}
        >
          <Button type="dashed">
            Список дій
            <DownOutlined />
          </Button>
        </Dropdown>
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

export default memo(CategoriesTable);

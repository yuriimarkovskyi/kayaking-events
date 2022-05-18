import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { columns, dataSource } from '../helpers/eventsData';

function AdminEvents() {
  const events = useSelector((state) => state.events.events);
  events.forEach((el) => {
    dataSource.push({
      ...el,
      images: el.images.map((item) => item),
    });
  });

  return (
    <Table
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: true }}
    />
  );
}

export default AdminEvents;

import React from 'react';
import { Table } from 'antd';
import Title from './UI/Title';
import { columns, dataSource } from '../helpers/membersData';
import { uniqObjectsByKey } from '../helpers/uniqObjectsByKey';

function AdminRegistrations() {
  const storedMembers = JSON.parse(localStorage.getItem('events-list'));
  const uniqMembers = uniqObjectsByKey(storedMembers, 'event');
  const eventTableColumn = columns.filter((el) => el.dataIndex === 'event');

  uniqMembers.forEach((el) => {
    eventTableColumn.map((item) => item.filters.push({
      text: el.event,
      value: el.event,
    }));
  });

  storedMembers.forEach((el) => {
    el.id = new Date(el.id).toLocaleString();
    el.date = new Date(el.date).toLocaleDateString();
    dataSource.push(el);
  });

  return (
    <>
      <Title>
        Інформація щодо реєстрацій
      </Title>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
      />
    </>
  );
}

export default AdminRegistrations;

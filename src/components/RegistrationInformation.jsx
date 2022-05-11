import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { columns } from '../helpers/membersData';

function RegistrationInformation({ member }) {
  const dataSource = [];

  member.data.forEach((el) => dataSource.push(el));

  return (
    <div className="registration-information">
      <h1 className="registration-information__title">
        {member.event}
      </h1>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

RegistrationInformation.propTypes = {
  member: PropTypes.exact({
    event: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.exact({
      id: PropTypes.number.isRequired,
      date: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      soloKayaks: PropTypes.number.isRequired,
      doubleKayaks: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      notes: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
};

export default RegistrationInformation;

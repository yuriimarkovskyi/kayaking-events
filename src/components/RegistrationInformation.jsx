import React from 'react';
import PropTypes from 'prop-types';
import { uniqObjectsByKey } from '../helpers/uniqObjectsByKey';

function RegistrationInformation({ member }) {
  const membersUniqDate = uniqObjectsByKey(member.generalData, 'date', 'restData');

  return (
    <div className="registration-information">
      <h1 className="registration-information__title">
        {member.event}
      </h1>
      <table className="registration-information-table">
        <thead className="registration-information-table__header">
          <tr>
            <th>
              Ім`я
            </th>
            <th>
              Email
            </th>
            <th>
              Номер телефону
            </th>
            <th>
              Одномісних каяків
            </th>
            <th>
              Двомісних каяків
            </th>
            <th>
              Сума до сплати
            </th>
            <th>
              Нотатки
            </th>
            <th>
              Статус
            </th>
          </tr>
        </thead>
        {membersUniqDate.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tbody key={index} className="registration-information-table__body">
            <tr className="registration-information-table__body-date">
              <td>
                <h3>
                  {new Date(el.date).toLocaleDateString()}
                </h3>
              </td>
            </tr>
            {el.restData.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.email}
                </td>
                <td>
                  {item.phone}
                </td>
                <td>
                  {item.soloKayaks}
                </td>
                <td>
                  {item.doubleKayaks}
                </td>
                <td>
                  {item.price}
                </td>
                <td>
                  {item.notes}
                </td>
                <td>
                  <input type="checkbox" checked={item.isCompleted} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

RegistrationInformation.propTypes = {
  member: PropTypes.exact({
    event: PropTypes.string.isRequired,
    generalData: PropTypes.arrayOf(PropTypes.exact({
      date: PropTypes.number.isRequired,
      restData: PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        soloKayaks: PropTypes.number.isRequired,
        doubleKayaks: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        notes: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
};

export default RegistrationInformation;

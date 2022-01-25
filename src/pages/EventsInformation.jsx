import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function EventsInformation() {
  const storedMembers = JSON.parse(Object.values(localStorage));
  const events = useSelector((state) => state.events);
  const [activeTab, setActiveTab] = useState(Object.keys(events));

  const handleTab = (e) => {
    setActiveTab(e.target.dataset.value);
  };

  return (
    <div>
      <button type="button" data-value="members" onClick={handleTab}>
        Members
      </button>
      <button type="button" data-value="events" onClick={handleTab}>
        Events
      </button>
      {activeTab
        ? storedMembers.map((item) => (
          <ul style={{ display: 'flex', gap: '30px' }} key={item.phone}>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Поход: </span>
              {item.event}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>ФИО: </span>
              {item.name}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>E-mail: </span>
              {item.email}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Номер телефона: </span>
              {item.phone}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Дата: </span>
              {item.date}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Одноместных каяков: </span>
              {item.singleKayaks}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Двухместных каяков: </span>
              {item.doubleKayaks}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Сумма: </span>
              {item.price}
            </li>
            <li
              style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Примечания: </span>
              {item.notes}
            </li>
          </ul>
        ))
        : '123'}
    </div>
  );
}

export default EventsInformation;

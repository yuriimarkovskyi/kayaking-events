import React from 'react';
import { useSelector } from 'react-redux';
import Title from '../components/UI/Title';
import EventsItem from '../components/EventsItem';

function Events() {
  const events = useSelector((state) => state.events.events);

  return (
    <div className="events">
      <Title>
        Оберіть сплав, на який бажаєте зареєструватись
      </Title>
      <div className="events__items">
        {events.map((event) => (
          <EventsItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;

import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Title from '../components/UI/Title';

function EventsList() {
  const events = useSelector((state) => state.events.events);

  return (
    <div className="events-list">
      <Helmet>
        <title>
          Список івентів
        </title>
      </Helmet>
      <Title>
        Оберіть івент, на який бажаєте зареєструватись
      </Title>
      <div className="events-list__items">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`event/${event.link}`}
            className="events-list__item"
          >
            <h3 className="events-list__item-title">
              {event.title}
            </h3>
            <img src={event.image} alt="" className="events-list__item-image" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventsList;

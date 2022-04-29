import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function EventsItem({ event }) {
  return (
    <Link className="events-item" to={`event/${event.name}`}>
      <h3 className="events-item__title">
        {event.title}
      </h3>
      <img src={event.image} alt="" className="events-item__image" />
    </Link>
  );
}

EventsItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    dates: PropTypes.arrayOf(PropTypes.number).isRequired,
    priceSingleKayak: PropTypes.number.isRequired,
    priceDoubleKayak: PropTypes.number.isRequired,
    imagesSlider: PropTypes.arrayOf(PropTypes.string).isRequired,
    descriptionFeatures: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default EventsItem;

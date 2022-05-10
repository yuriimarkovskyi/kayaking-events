import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibility } from '../store/visibilitySlice';
import Modal from './UI/Modal';
import Button from './UI/Button';
import EventForm from './EventForm';

function EventInformation({ link }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.link === link);

  const showModal = () => {
    dispatch(changeVisibility());
  };

  return (
    <div className="event-information">
      {currentEvent.map((item) => (
        <ul key={item.id} className="event-information__list">
          <li className="event-information__list-item">
            {item.description}
          </li>
          <ul className="event-information__list">
            {item.descriptionFeatures.map((feature) => (
              <li className="list-item" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
          <li className="event-information__list-item event-information__list-item_bold">
            Вартість:
          </li>
          <ul className="event-information__list">
            <li className="event-information__list-item">
              Одномісний каяк -
              {' '}
              {item.priceSingleKayak}
              {' '}
              ГРН
            </li>
            <li className="event-information__list-item">
              Двомісний каяк -
              {' '}
              {item.priceDoubleKayak}
              {' '}
              ГРН
            </li>
          </ul>
          <li className="event-information__list-item event-information__list-item_bold">
            Дати:
          </li>
          <ul className="event-information__list">
            {item.dates.map((date) => (
              <li key={date} className="event-information__list-item">
                {new Date(date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </ul>
      ))}
      <Button type="button" onClick={showModal}>
        Реєстрація
      </Button>
      <Modal>
        <EventForm link={link} />
      </Modal>
    </div>
  );
}

EventInformation.propTypes = {
  link: PropTypes.string.isRequired,
};

export default EventInformation;

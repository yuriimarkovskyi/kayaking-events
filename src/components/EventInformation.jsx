import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeVisibility } from '../store/visibilitySlice';
import Modal from './UI/Modal';
import Button from './UI/Button';
import EventForm from './EventForm';

function EventInformation() {
  const dispatch = useDispatch();
  const { link } = useParams();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((el) => el.link === link);

  const showModal = () => {
    dispatch(changeVisibility());
  };

  return (
    <div className="event-information">
      {currentEvent.map((el) => (
        <ul key={el.id} className="event-information__list">
          <li className="event-information__list-item">
            {el.description}
          </li>
          <ul className="event-information__list">
            {el.descriptionFeatures.map((feature) => (
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
              {`Одномісний каяк - ${el.priceSoloKayak} ГРН`}
            </li>
            <li className="event-information__list-item">
              {`Двомісний каяк - ${el.priceSoloKayak} ГРН`}
            </li>
          </ul>
          <li className="event-information__list-item event-information__list-item_bold">
            Дати:
          </li>
          <ul className="event-information__list">
            {el.dates.map((date) => (
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
        <EventForm />
      </Modal>
    </div>
  );
}

export default EventInformation;

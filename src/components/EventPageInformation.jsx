import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeVisibilityAction } from '../store/visibilityReducer';
import Modal from './UI/Modal';
import Button from './UI/Button';
import EventPageFormNew from './EventPageForm';

const StyledEventPageInformation = styled.div`
  .list {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  .list-item {
    &_bold {
      font-weight: bold;
    }
  }
`;

function EventPageInformation({ name }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);

  const handleShowModal = () => {
    dispatch(changeVisibilityAction());
  };

  return (
    <StyledEventPageInformation>
      {currentEvent.map((item) => (
        <ul className="list" key={item.id}>
          <li className="list-item">{item.description}</li>
          <ul className="list">
            {item.descriptionFeatures.map((feature) => (
              <li className="list-item" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
          <li className="list-item list-item_bold">Вартість:</li>
          <ul className="list">
            <li className="list-item">
              Одномісний каяк -
              {' '}
              {item.priceSingleKayak}
              {' '}
              UAH
            </li>
            <li className="list-item">
              Двомісний каяк -
              {' '}
              {item.priceDoubleKayak}
              {' '}
              UAH
            </li>
          </ul>
          <li className="list-item list-item_bold">Дати:</li>
          <ul className="list">
            {item.dates.map((date) => (
              <li className="list-item" key={date}>
                {new Date(date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </ul>
      ))}
      <Button onClick={handleShowModal}>Реєстрація</Button>
      <Modal>
        <EventPageFormNew name={name} />
      </Modal>
    </StyledEventPageInformation>
  );
}

EventPageInformation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EventPageInformation;

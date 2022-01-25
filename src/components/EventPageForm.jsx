import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberAction } from '../store/membersReducer/action';
import { changeVisibilityAction } from '../store/visibilityReducer';
import Button from './UI/Button';
import Input from './UI/Input';
import TextArea from './UI/TextArea';
import Select from './UI/Select';

const StyledEventPageForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  font-size: 18px;

  .kayaks-count {
    display: flex;
    align-items: center;
    column-gap: 5px;

    p {
      margin-bottom: 0;
    }
  }

  .kayaks-counter {
    span {
      font-weight: bold;
    }
  }

  .price {
    span {
      font-weight: bold;
    }
  }
`;

function EventPageForm({ name }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const selectRef = useRef();
  const priceRef = useRef();
  const textAreaRef = useRef();

  const [singleKayaks, setSingleKayaks] = useState(0);
  const [doubleKayaks, setDoubleKayaks] = useState(0);

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);
  const priceSingleKayak = currentEvent.map((item) => item.priceSingleKayak);
  const priceDoubleKayak = currentEvent.map((item) => item.priceDoubleKayak);
  const members = useSelector((state) => state.members.members);

  const addNewPost = (e) => {
    e.preventDefault();

    const item = {
      event: name,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      date: selectRef.current.value,
      notes: textAreaRef.current.value,
      singleKayaks,
      doubleKayaks,
      price: priceRef.current.textContent.replace(/\D/g, ''),
    };

    dispatch(addMemberAction(item));
    dispatch(changeVisibilityAction());
  };

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(members));
  }, [members]);

  const handleIncreaseSingleKayaks = () => {
    setSingleKayaks(singleKayaks + 1);
  };

  const handleDecreaseSingleKayaks = () => {
    setSingleKayaks(singleKayaks - 1);
  };

  const handleIncreaseDoubleKayaks = () => {
    setDoubleKayaks(doubleKayaks + 1);
  };

  const handleDecreaseDoubleKayaks = () => {
    setDoubleKayaks(doubleKayaks - 1);
  };

  return (
    <StyledEventPageForm>
      <Input ref={nameRef} placeholder="ПІБ" required />
      <Input ref={emailRef} type="email" placeholder="Email" />
      <Input ref={phoneRef} type="phone" placeholder="Номер телефону" />
      <Select ref={selectRef} defaultValue="Дата походу">
        <option disabled>Дата походу</option>
        {currentEvent.map((item) => item.dates.map((date) => (
          <option key={date}>{new Date(date).toLocaleDateString()}</option>
        )))}
      </Select>
      <div className="kayaks-count">
        <p className="kayaks-counter">
          Одномісних каяків:
          <span>
            {' '}
            {singleKayaks}
          </span>
        </p>
        <Button secondary type="button" onClick={handleIncreaseSingleKayaks}>
          +
        </Button>
        <Button
          secondary
          type="button"
          disabled={!singleKayaks}
          onClick={handleDecreaseSingleKayaks}
        >
          -
        </Button>
      </div>
      <div className="kayaks-count">
        <p className="kayaks-counter">
          Двомісних каяків:
          <span>
            {' '}
            {doubleKayaks}
          </span>
        </p>
        <Button secondary type="button" onClick={handleIncreaseDoubleKayaks}>
          +
        </Button>
        <Button
          secondary
          type="button"
          disabled={!doubleKayaks}
          onClick={handleDecreaseDoubleKayaks}
        >
          -
        </Button>
      </div>
      <p className="price" ref={priceRef}>
        Загальна вартість:
        <span>
          {' '}
          {priceSingleKayak * singleKayaks
            + priceDoubleKayak * doubleKayaks}
          {' '}
        </span>
        UAH
      </p>
      <TextArea ref={textAreaRef} placeholder="Примітки" />
      <Button onClick={addNewPost}>Зареєструватись</Button>
    </StyledEventPageForm>
  );
}

EventPageForm.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EventPageForm;

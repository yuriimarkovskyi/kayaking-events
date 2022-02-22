import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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
    &__title {
      font-weight: bold;
      margin-right: 5px;
    }

    &__input {
      border: none;
      width: 50px;
    }
  }

  .price {
    span {
      font-weight: bold;
    }
  }
`;

function EventPageForm({ name }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const members = useSelector((state) => state.members.members);
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);
  const priceSingleKayak = currentEvent.map((item) => item.priceSingleKayak);
  const priceDoubleKayak = currentEvent.map((item) => item.priceDoubleKayak);
  const [date, setDate] = useState();
  const [singleKayaks, setSingleKayaks] = useState(0);
  const [doubleKayaks, setDoubleKayaks] = useState(0);
  const [price, setPrice] = useState();
  const totalPrice = priceSingleKayak * singleKayaks + priceDoubleKayak * doubleKayaks;

  const handleChangeDate = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };

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

  const handleChangePrice = () => {
    setPrice(totalPrice);
  };

  const onSubmit = (data) => {
    const member = {
      id: Date.now(),
      event: name,
      name: data.customerName,
      email: data.email,
      phone: data.phone,
      date: data.date,
      singleKayaks,
      doubleKayaks,
      price: totalPrice,
      notes: data.notes,
    };
    console.log(member);
    dispatch(addMemberAction(member));
    dispatch(changeVisibilityAction());
    reset();
  };

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(members));
  }, [members]);

  return (
    <StyledEventPageForm onSubmit={handleSubmit(onSubmit)}>
      {errors.name && <span>{errors.name.message}</span>}
      <Controller
        defaultValue=""
        name="customerName"
        control={control}
        rules={{ required: 'Введіть ПІБ' }}
        render={({ field }) => (
          <Input
            placeholder="ПІБ"
            {...field}
          />
        )}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <Controller
        defaultValue=""
        name="email"
        control={control}
        rules={{ required: 'Введіть email' }}
        render={({ field }) => (
          <Input
            type="email"
            placeholder="Електронна пошта"
            {...field}
          />
        )}
      />
      {errors.phone && <span>{errors.phone.message}</span>}
      <Controller
        defaultValue=""
        name="phone"
        control={control}
        rules={{ required: 'Введіть номер телефону' }}
        render={({ field }) => (
          <Input
            type="phone"
            placeholder="Номер телефону"
            {...field}
          />
        )}
      />
      <Controller
        defaultValue={date}
        value={date}
        name="date"
        control={control}
        rules={{ required: 'Оберіть дату походу' }}
        render={({ field }) => (
          <Select
            onChange={handleChangeDate}
            {...field}
          >
            {currentEvent.map((item) => item.dates.map((eventDate) => (
              <option key={eventDate}>
                {new Date(eventDate).toLocaleDateString()}
              </option>
            )))}
          </Select>
        )}
      />
      <div className="kayaks-count">
        <p className="kayaks-counter">
          Одномісних каяків:
          <span>
            {` ${singleKayaks}`}
          </span>
        </p>
        <Button
          secondary
          onClick={handleIncreaseSingleKayaks}
        >
          +
        </Button>
        <Button
          secondary
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
        <Button
          secondary
          onClick={handleIncreaseDoubleKayaks}
        >
          +
        </Button>
        <Button
          secondary
          disabled={!doubleKayaks}
          onClick={handleDecreaseDoubleKayaks}
        >
          -
        </Button>
      </div>
      <p
        value={price}
        onChange={handleChangePrice}
        className="price"
      >
        Загальна вартість:
        <span>
          {` ${priceSingleKayak * singleKayaks + priceDoubleKayak * doubleKayaks} `}
        </span>
        UAH
      </p>
      <Controller
        defaultValue=""
        name="notes"
        control={control}
        render={({ field }) => (
          <TextArea
            placeholder="Примітки"
            {...field}
          />
        )}
      />
      <Button type="submit" disabled={!isValid}>
        Зареєструватись
      </Button>
    </StyledEventPageForm>
  );
}

EventPageForm.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EventPageForm;

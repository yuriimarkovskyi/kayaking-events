import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addMemberAction } from '../store/membersReducer/action';
import { changeVisibilityAction } from '../store/visibilityReducer';
import Button from './UI/Button';

function EventForm({ name }) {
  const dispatch = useDispatch();
  const {
    register, handleSubmit, reset, formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const members = useSelector((state) => state.members.members);
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);
  const priceSingleKayak = currentEvent.map((item) => item.priceSingleKayak);
  const priceDoubleKayak = currentEvent.map((item) => item.priceDoubleKayak);
  const [singleKayaks, setSingleKayaks] = useState(0);
  const [doubleKayaks, setDoubleKayaks] = useState(0);
  const price = `${priceSingleKayak * singleKayaks + priceDoubleKayak * doubleKayaks} ГРН`;

  const handleChangeSingleKayaks = (e) => {
    setSingleKayaks(e.target.value);
  };

  const handleChangeDoubleKayaks = (e) => {
    setDoubleKayaks(e.target.value);
  };

  const onSubmit = (data) => {
    const member = {
      id: Date.now(),
      event: name,
      name: data.customerName,
      email: data.email,
      phone: data.phone,
      date: data.date,
      singleKayaks: Number(data.singleKayaks),
      doubleKayaks: Number(data.doubleKayaks),
      price,
      notes: data.notes,
    };
    console.log(member);
    dispatch(addMemberAction(member));
    dispatch(changeVisibilityAction());

    setSingleKayaks(1);
    setDoubleKayaks(1);
    reset();
  };

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(members));
  }, [members]);

  return (
    <form className="event-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="event-form__field-wrapper">
        <input
          className={`event-form__field event-form__input ${errors.customerName ? 'error' : ''}`}
          placeholder="ПІБ"
          {...register('customerName', {
            required: 'Поле обов`язкове для заповнення',
            minLength: {
              value: 6,
              message: 'Мінімум 6 символів',
            },
            maxLength: {
              value: 120,
              message: 'Максимум 120 символів',
            },
            pattern: {
              value: /[A-Za-zА-Яа-яїЇ]/,
              message: 'У полі присутні недопустимі символи',
            },
          })}
        />
        {errors.customerName
                    && (
                    <p className="event-form__field-error-text">
                      {errors.customerName.message}
                    </p>
                    )}
      </div>
      <div className="event-form__field-wrapper">
        <input
          type="email"
          className={`event-form__field event-form__input ${errors.email ? 'error' : ''}`}
          placeholder="Електронна пошта"
          {...register('email', {
            required: 'Поле обов`язкове для заповнення',
            pattern: {
              value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9\-.]+\.[A-Za-z]/,
              message: 'Введіть коректний email',
            },
          })}
        />
        {errors.email
                    && (
                    <p className="event-form__field-error-text">
                      {errors.email.message}
                    </p>
                    )}
      </div>
      <div className="event-form__field-wrapper">
        <input
          type="tel"
          className={`event-form__field event-form__input ${errors.phone ? 'error' : ''}`}
          defaultValue="+380"
          placeholder="Номер телефону"
          {...register('phone', {
            required: 'Поле обов`язкове для заповнення',
            pattern: {
              value: /^(?:\+38)?(0[5-9][0-9]\d{7})$/,
              message: 'Введіть, будь ласка, український номер телефону',
            },
          })}
        />
        {errors.phone
                    && (
                    <p className="event-form__field-error-text">
                      {errors.phone.message}
                    </p>
                    )}
      </div>
      <div className="event-form__field-wrapper">
        <select
          className={`event-form__field event-form__select ${errors.date ? 'error' : ''}`}
          {...register('date', {
            required: 'Оберіть, будь ласка, дату походу',
          })}
        >
          <option value="">
            Дата походу
          </option>
          {currentEvent.map((item) => item.dates.map((eventDate) => (
            <option key={eventDate} value={new Date(eventDate).toLocaleDateString()}>
              {new Date(eventDate).toLocaleDateString()}
            </option>
          )))}
        </select>
        {errors.date
                    && (
                    <p className="event-form__field-error-text">
                      {errors.date.message}
                    </p>
                    )}
      </div>
      <div className="event-form__field-wrapper">
        <input
          className="event-form__input-range"
          defaultValue={singleKayaks}
          type="range"
          onInput={handleChangeSingleKayaks}
          onMouseUp={handleChangeSingleKayaks}
          min="1"
          max="10"
          {...register('singleKayaks')}
        />
        <span className="event-form__input-range-value">
          Одномісних каяків
          {' - '}
          <span>
            {singleKayaks}
          </span>
        </span>
      </div>
      <div className="event-form__field-wrapper">
        <input
          className="event-form__input-range"
          defaultValue={doubleKayaks}
          type="range"
          onInput={handleChangeDoubleKayaks}
          onMouseUp={handleChangeDoubleKayaks}
          min="1"
          max="10"
          {...register('doubleKayaks')}
        />
        <span className="event-form__input-range-value">
          Двомісних каяків
          {' - '}
          <span>
            {doubleKayaks}
          </span>
        </span>
      </div>
      <div className="event-form__field-wrapper event-form__field-wrapper_price">
        <span>
          {'Загальна вартість: '}
        </span>
        <input
          disabled
          className="event-form__input-price"
          value={price}
        />
      </div>
      <div className="event-form__field-wrapper">
        <textarea
          className="event-form__field event-form__field_notes"
          placeholder="Примітки"
          {...register('notes')}
        />
      </div>
      <Button disabled={!isValid}>
        Зареєструватись
      </Button>
    </form>
  );
}

EventForm.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EventForm;

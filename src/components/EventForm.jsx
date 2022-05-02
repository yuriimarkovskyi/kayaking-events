import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { changeVisibility } from '../store/visibilitySlice';
import Button from './UI/Button';
import { addMember } from '../store/membersSlice';

function EventForm({ name }) {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);
  const priceSingleKayak = currentEvent.map((item) => item.priceSingleKayak);
  const priceDoubleKayak = currentEvent.map((item) => item.priceDoubleKayak);
  const [singleKayaks, setSingleKayaks] = useState(0);
  const [doubleKayaks, setDoubleKayaks] = useState(0);
  const price = `${priceSingleKayak * singleKayaks + priceDoubleKayak * doubleKayaks} ГРН`;

  const {
    register, handleSubmit, reset, formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      phone: '+380',
      singleKayaks,
      doubleKayaks,
    },
  });

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

    dispatch(addMember(member));
    dispatch(changeVisibility());

    setSingleKayaks(1);
    setDoubleKayaks(1);
    reset();
  };

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(members));
  }, [members]);

  return (
    <form className="event-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
      <input
        type="tel"
        className={`event-form__field event-form__input ${errors.phone ? 'error' : ''}`}
        placeholder="Номер телефону"
        {...register('phone', {
          required: 'Поле обов`язкове для заповнення',
          minLength: {
            value: 13,
            message: 'Мінімальна довжина 13 символів',
          },
          maxLength: {
            value: 13,
            message: 'Максимальна довжина 13 символів',
          },
          pattern: {
            value: /^(?:\+38)?(0[5-9][0-9]\d{7})$/,
            message: 'Номер телефону має бути в українському форматі',
          },
        })}
      />
      {errors.phone
                    && (
                    <p className="event-form__field-error-text">
                      {errors.phone.message}
                    </p>
                    )}
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
      <div className="event-form__field-wrapper">
        <input
          className="event-form__input-range"
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
      <div className="event-form__field-wrapper">
        <span>
          {'Загальна вартість: '}
        </span>
        <input
          disabled
          className="event-form__input-price"
          value={price}
        />
      </div>
      <textarea
        className="event-form__field event-form__field_notes"
        placeholder="Примітки"
        {...register('notes')}
      />
      <Button className="event-form__button" disabled={!isValid}>
        Зареєструватись
      </Button>
    </form>
  );
}

EventForm.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EventForm;

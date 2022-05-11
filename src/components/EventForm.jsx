import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { changeVisibility } from '../store/visibilitySlice';
import Button from './UI/Button';
import { addMember } from '../store/membersSlice';

function EventForm({ link }) {
  const {
    register, handleSubmit, watch, reset, formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.link === link);

  const soloKayaks = watch('soloKayaks', 0);
  const doubleKayaks = watch('doubleKayaks', 0);
  const priceSoloKayak = currentEvent.map((item) => item.priceSoloKayak);
  const priceDoubleKayak = currentEvent.map((item) => item.priceDoubleKayak);
  const price = `${priceSoloKayak * soloKayaks + priceDoubleKayak * doubleKayaks} ГРН`;

  const onSubmit = (data) => {
    const member = {
      event: link,
      data: {
        id: Date.now(),
        date: Number(data.date),
        name: data.name,
        email: data.email,
        phone: data.phone,
        soloKayaks: Number(data.soloKayaks),
        doubleKayaks: Number(data.doubleKayaks),
        price: parseInt(price, 10),
        notes: data.notes,
        isCompleted: false,
      },
    };

    dispatch(addMember(member));
    dispatch(changeVisibility());
    reset();
  };

  useEffect(() => {
    localStorage.setItem('events-list', JSON.stringify(members));
  }, [members]);

  return (
    <form className="event-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        className={`event-form__field event-form__input ${errors.customerName ? 'error' : ''}`}
        placeholder="ПІБ"
        {...register('name', {
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
        defaultValue="+380"
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
          <option key={eventDate} value={eventDate}>
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
          type="range"
          className="event-form__input-range"
          defaultValue="0"
          min="0"
          max="10"
          {...register('soloKayaks', { required: true })}
        />
        <span className="event-form__input-range-value">
          Одномісних каяків
          {' - '}
          <span>
            {soloKayaks}
          </span>
        </span>
      </div>
      <div className="event-form__field-wrapper">
        <input
          type="range"
          className="event-form__input-range"
          defaultValue="0"
          min="0"
          max="10"
          {...register('doubleKayaks', { required: true })}
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
          {'Сума до сплати: '}
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
  link: PropTypes.string.isRequired,
};

export default EventForm;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { changeVisibility } from '../store/visibilitySlice';
import { addCustomer } from '../store/registrationsSlice';

function EventForm() {
  const {
    register, handleSubmit, watch, reset, formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });
  const dispatch = useDispatch();
  const { link } = useParams();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.link === link);
  const currentEventName = currentEvent.map((el) => el.name).toString();
  const numberOfSoloKayaks = watch('numberOfSoloKayaks', 0);
  const numberOfDoubleKayaks = watch('numberOfDoubleKayaks', 0);
  const priceSoloKayak = currentEvent.map((item) => item.priceSoloKayak);
  const priceDoubleKayak = currentEvent.map((item) => item.priceDoubleKayak);
  const amountPayable = `${priceSoloKayak * numberOfSoloKayaks + priceDoubleKayak * numberOfDoubleKayaks} ГРН`;

  const onSubmit = (data) => {
    const customer = {
      id: Date.now(),
      eventName: currentEventName,
      registrationTime: Date.now(),
      eventDate: Number(data.date),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      numberOfSoloKayaks: Number(data.numberOfSoloKayaks),
      numberOfDoubleKayaks: Number(data.numberOfDoubleKayaks),
      amountPayable: parseInt(amountPayable, 10),
      notes: data.notes,
      isCompleted: false,
    };

    dispatch(addCustomer(customer));
    dispatch(changeVisibility());
    reset();
  };

  return (
    <form className="event-form" noValidate>
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
        className={`event-form__field event-form__input ${errors.customerEmail ? 'error' : ''}`}
        placeholder="Електронна пошта"
        {...register('customerEmail', {
          required: 'Поле обов`язкове для заповнення',
          pattern: {
            value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9\-.]+\.[A-Za-z]/,
            message: 'Введіть коректний email',
          },
        })}
      />
      {errors.customerEmail
                    && (
                    <p className="event-form__field-error-text">
                      {errors.customerEmail.message}
                    </p>
                    )}
      <input
        type="tel"
        className={`event-form__field event-form__input ${errors.customerPhone ? 'error' : ''}`}
        defaultValue="+380"
        placeholder="Номер телефону"
        {...register('customerPhone', {
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
      {errors.customerPhone
                    && (
                    <p className="event-form__field-error-text">
                      {errors.customerPhone.message}
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
          {...register('numberOfSoloKayaks', { required: true })}
        />
        <span className="event-form__input-range-value">
          Одномісних каяків
          {' - '}
          <span>
            {numberOfSoloKayaks}
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
          {...register('numberOfDoubleKayaks', { required: true })}
        />
        <span className="event-form__input-range-value">
          Двомісних каяків
          {' - '}
          <span>
            {numberOfDoubleKayaks}
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
          value={amountPayable}
        />
      </div>
      <textarea
        className="event-form__field event-form__field_notes"
        placeholder="Примітки"
        {...register('notes')}
      />
      <Button
        type="primary"
        value="large"
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}
        block
      >
        Зареєструватись
      </Button>
    </form>
  );
}

export default EventForm;

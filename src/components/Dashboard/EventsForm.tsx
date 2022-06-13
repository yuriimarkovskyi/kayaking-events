import React from 'react';
import {
  Form, Input, message, Select,
} from 'antd';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { firebaseDb } from 'firebaseConfig';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { IRentalStation } from 'types';

interface EventsFormProps {
  closeDrawer: () => void
}

function EventsForm({ closeDrawer }: EventsFormProps) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [rentalStations] = useListVals<IRentalStation>(ref(firebaseDb, 'rentalStations'));

  const onFinish = (values: any) => {
    const {
      eventName, rentalStation, link, title, description,
    } = values;

    const event = {
      key: Date.now(),
      eventName,
      rentalStation,
      link,
      title,
      description,
    };

    form.resetFields();

    pushDataToDb(firebaseDb, 'events', event);

    message.success({
      content: 'Івент доданий',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeDrawer();
  };

  return (
    <Form
      id="events-form"
      className="form"
      form={form}
      layout="vertical"
      name="events-form"
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="eventName"
        label="Подія:"
        tooltip="Коротка узагальнююча назва, повну назву необхідно буде вказати у полі 'Заголовок'"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { min: 4, message: 'Поле має містити у собі мінімум 4 символи' },
          { max: 25, message: 'Поле може містити у собі максимум 25 символів' },
          { pattern: /[А-Яа-яїЇ]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="rentalStation"
        label="Станція проведення:"
        rules={[
          { required: true, message: 'Необхідно обрати івент' },
        ]}
      >
        <Select>
          {rentalStations?.map((val) => (
            <Option key={val.key} value={val.rentalName}>
              {val.rentalName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="link"
        label="Лінк:"
        tooltip="Лінк за яким буде доступна сторінка події на сайті"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { min: 4, message: 'Поле має містити у собі мінімум 4 символи' },
          { max: 25, message: 'Поле може містити у собі максимум 25 символів' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { pattern: /[A-Za-z]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input addonBefore={`${process.env.REACT_APP_PUBLIC_URL}/event/`} />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="title"
        label="Заголовок:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { min: 6, message: 'Поле має містити у собі мінімум 6 символів' },
          { max: 60, message: 'Поле може містити у собі максимум 60 символів' },
          { pattern: /[А-Яа-яїЇ]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="description"
        label="Опис:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { min: 6, message: 'Поле має містити у собі мінімум 6 символів' },
          { max: 200, message: 'Поле може містити у собі максимум 200 символів' },
          { pattern: /[А-Яа-яїЇ]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default EventsForm;

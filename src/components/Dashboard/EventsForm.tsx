import React from 'react';
import { Form, Input, message } from 'antd';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { firebaseDb } from 'firebaseConfig';

interface EventsFormProps {
  closeDrawer: () => void
}

function EventsForm({ closeDrawer }: EventsFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const {
      eventName, link, title, description,
    } = values;

    const event = {
      key: Date.now(),
      eventName,
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
        label="Івент:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { min: 4, message: 'Поле має містити у собі мінімум 4 символів' },
          { max: 20, message: 'Поле може містити у собі максимум 20 символів' },
          { pattern: /[А-Яа-яїЇ]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="link"
        label="Лінк:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { min: 4, message: 'Поле має містити у собі мінімум 4 символів' },
          { max: 20, message: 'Поле може містити у собі максимум 20 символів' },
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

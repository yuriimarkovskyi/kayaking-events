import React from 'react';
import {
  Button, Form, Input, message, Select,
} from 'antd';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { db } from 'config/firebase';
import { URL } from 'config';
import { useListVals } from 'react-firebase-hooks/database';
import { ref as ref_db } from 'firebase/database';
import { IEvent, IRentalStation } from 'types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
  closeDrawer: () => void;
}

function EventsForm({ closeDrawer }: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [rentalStations] = useListVals<IRentalStation>(ref_db(db, 'rentalStations'));

  const onFinish = (values: any) => {
    const {
      eventName,
      rentalStation,
      link,
      routeMap,
      title,
      description,
      features,
      cover,
    } = values;

    const event: IEvent = {
      key: Date.now(),
      eventName,
      rentalStation,
      link,
      routeMap,
      title,
      description,
      features,
      cover,
    };

    form.resetFields();

    pushDataToDb(db, 'events', event);

    message.success({
      content: 'Подія додана',
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
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
          {
            min: 4,
            message: 'Поле має містити у собі мінімум 4 символи',
          },
          {
            max: 25,
            message: 'Поле може містити у собі максимум 25 символів',
          },
          {
            pattern: /[А-Яа-яїЇ]/,
            message: 'У полі присутні неприпустимі символи',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="rentalStation"
        label="Станція проведення:"
        tooltip="Станція з якої стартує подія або звідки береться спорядження для події"
        rules={[
          {
            required: true,
            message: 'Необхідно обрати івент',
          },
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
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            min: 4,
            message: 'Поле має містити у собі мінімум 4 символи',
          },
          {
            max: 25,
            message: 'Поле може містити у собі максимум 25 символів',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
          {
            pattern: /[A-Za-z]/,
            message: 'У полі присутні неприпустимі символи',
          },
        ]}
      >
        <Input addonBefore={`${URL}/event/`} />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="routeMap"
        label="Карта маршруту:"
        tooltip="Посилання на активність у Страві"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
          {
            pattern: /^(https:\/\/)(www.strava.com\/)(activities\/)[0-9]*/,
            message: 'Посилання має бути коректним',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="title"
        label="Заголовок:"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
          {
            min: 6,
            message: 'Поле має містити у собі мінімум 6 символів',
          },
          {
            max: 60,
            message: 'Поле може містити у собі максимум 60 символів',
          },
          {
            pattern: /[А-Яа-яїЇ]/,
            message: 'У полі присутні неприпустимі символи',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="description"
        label="Опис:"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
          {
            min: 6,
            message: 'Поле має містити у собі мінімум 6 символів',
          },
          {
            max: 200,
            message: 'Поле може містити у собі максимум 200 символів',
          },
          {
            pattern: /[А-Яа-яїЇ]/,
            message: 'У полі присутні неприпустимі символи',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.List
        name="features"
      >
        {(fields, {
          add,
          remove,
        }) => (
          <>
            {fields.map(({
              key,
              name,
              ...restField
            }) => (
              <div className="form__list" key={key}>
                <Form.Item
                  {...restField}
                  name={[name]}
                  rules={[
                    {
                      required: true,
                      message: 'Поле є обов\'язковим для заповнення',
                    },
                  ]}
                  style={{ width: '100%' }}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Ключові особливості
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        className="form__item"
        name="cover"
        label="Обкладинка:"
        tooltip="Посилання на папку з обкладинкою"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sliderImages"
        label="Зображення слайдеру:"
        tooltip="Посилання на папку з зображеннями для слайдера"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default EventsForm;

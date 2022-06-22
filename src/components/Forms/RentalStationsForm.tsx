import React from 'react';
import {
  Form, Input, InputNumber, message,
} from 'antd';
import { IRentalStation } from 'types';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { db } from 'config/firebase';

interface Props {
  closeDrawer: () => void;
}

function RentalStationsForm({ closeDrawer }: Props) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const {
      rentalName,
      address,
      soloKayaks,
      doubleKayaks,
      sups,
      childSeats,
      carbonPaddles,
      neopreneSkirts,
      nylonSkirts,
      waterproofCases,
    } = values;

    const rentalStation: IRentalStation = {
      key: Date.now(),
      rentalName,
      address,
      totalPlaces: {
        soloKayaks,
        doubleKayaks,
        sups,
      },
      equipment: {
        childSeats,
        carbonPaddles,
        skirts: {
          neoprene: neopreneSkirts,
          nylon: nylonSkirts,
        },
        waterproofCases,
      },
    };

    form.resetFields();

    pushDataToDb(db, 'rentalStations', rentalStation);

    message.success({
      content: 'Станція прокату додана',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeDrawer();
  };

  return (
    <Form
      id="rental-stations-form"
      className="form"
      form={form}
      layout="vertical"
      name="rental-stations-form"
      onFinish={onFinish}
      initialValues={{
        soloKayaks: 0,
        doubleKayaks: 0,
        sups: 0,
        childSeats: 0,
        carbonPaddles: 0,
        neopreneSkirts: 0,
        nylonSkirts: 0,
        waterproofCases: 0,
      }}
    >
      <Form.Item
        className="form__item"
        name="rentalName"
        label="Станція:"
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
            pattern: /[А-Яа-яїЇ]/,
            message: 'У полі присутні неприпустимі символи',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="address"
        label="Адреса:"
        tooltip="Посилання на гугл карти"
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
            pattern: /^(https:\/\/)(goo.gl\/)(maps\/)[A-Za-z0-9]*/,
            message: 'Посилання має бути коректним',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          name="soloKayaks"
          label="Одномісних каяків:"
          tooltip="Тут і надалі необхідно вказати кількість, що доступна саме для проведення подій"
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="doubleKayaks"
          label="Двомісних каяків:"
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="sups"
          label="Дошок:"
        >
          <InputNumber min={0} />
        </Form.Item>
      </div>
      <div className="registration-form__items-group">
        <Form.Item
          name="childSeats"
          label="Дитячих сидінь:"
          tooltip="Тут і надалі необхідно вказати кількість, що доступна для видачі клієнтам на подіях"
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="carbonPaddles"
          label="Карбонових весел:"
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="neopreneSkirts"
          label="Неопренових спідниць:"
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="nylonSkirts"
          label="Нейлонових спідниць:"
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="waterproofCases"
          label="Водонепроникних кейсів:"
        >
          <InputNumber min={0} />
        </Form.Item>
      </div>
    </Form>
  );
}

export default RentalStationsForm;

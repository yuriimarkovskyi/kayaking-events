import React from 'react';
import {
  Form, Input, InputNumber, message,
} from 'antd';
import { IRentalStation } from 'types';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { firebaseDb } from 'firebaseConfig';

interface RentalStationsFormProps {
  closeDrawer: () => void
}

function RentalStationsForm({ closeDrawer }: RentalStationsFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const {
      rentalName, address, soloKayaks, doubleKayaks,
    } = values;

    const rentalStation: IRentalStation = {
      key: Date.now(),
      rentalName,
      address,
      totalPlaces: {
        soloKayaks,
        doubleKayaks,
      },
    };

    form.resetFields();

    pushDataToDb(firebaseDb, 'rentalStations', rentalStation);

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
    >
      <Form.Item
        className="form__item"
        name="rentalName"
        label="Станція:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { pattern: /[А-Яа-яїЇ]/, message: 'У полі присутні неприпустимі символи' },
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
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може бути пустим' },
          { pattern: /^(https:\/\/)(goo.gl\/)(maps\/)[A-Za-z0-9]*/, message: 'Посилання має бути коректним та вести на гугл карти' },
        ]}
      >
        <Input />
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          name="soloKayaks"
          label="Одномісних каяків:"
          tooltip="Необхідно вказати кількість, що доступна саме для проведення івентів (тобто не загальну кількість каяків, доступних на станції). Стосується також двомісних"
          rules={[
            { required: true, message: 'Поле є обов\'язковим для заповнення' },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="doubleKayaks"
          label="Двомісних каяків:"
          rules={[
            { required: true, message: 'Поле є обов\'язковим для заповнення' },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </div>
    </Form>
  );
}

export default RentalStationsForm;

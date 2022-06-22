import React from 'react';
import {
  Form, InputNumber, message, Select,
} from 'antd';
import { IEvent, IPrice } from 'types';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { db } from 'config/firebase';

interface Props {
  closeDrawer: () => void;
  events: IEvent[] | undefined;
}

function PricesForm({
  closeDrawer,
  events,
}: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = (values: any) => {
    const {
      eventName,
      soloKayak,
      doubleKayak,
    } = values;

    const price: IPrice = {
      key: Date.now(),
      eventName,
      soloKayak,
      doubleKayak,
    };

    form.resetFields();

    pushDataToDb(db, 'prices', price);

    message.success({
      content: 'Прайс доданий',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeDrawer();
  };

  return (
    <Form
      id="prices-form"
      className="form"
      form={form}
      layout="vertical"
      name="prices-form"
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="eventName"
        label="Подія:"
        rules={[
          {
            required: true,
            message: 'Необхідно обрати івент',
          },
        ]}
      >
        <Select>
          {events?.map((val) => (
            <Option key={val.key} value={val.eventName}>
              {val.eventName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          name="soloKayak"
          label="Одномісний каяк:"
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="doubleKayak"
          label="Двомісний каяк:"
          tooltip="Для дитини (на дитячому сидінні) вартість буде становити половину від вказаної вартості"
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </div>
    </Form>
  );
}

export default PricesForm;

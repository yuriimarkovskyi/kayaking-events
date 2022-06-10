import React from 'react';
import {
  Form, InputNumber, message, Select,
} from 'antd';
import { IEvent, IPrice } from 'types';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { firebaseDb } from 'firebaseConfig';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';

interface PricesFormProps {
  closeDrawer: () => void
}

function PricesForm({ closeDrawer }: PricesFormProps) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [prices] = useListVals<IPrice>(ref(firebaseDb, 'prices'));
  const [events] = useListVals<IEvent>(ref(firebaseDb, 'events'));

  const filteredEvents = events?.filter((event) => (
    prices?.every((val) => val.eventName !== event.eventName)
  ));

  const onFinish = (values: any) => {
    const {
      eventName, soloKayak, doubleKayak,
    } = values;

    const price: IPrice = {
      key: Date.now(),
      eventName,
      soloKayak,
      doubleKayak,
    };

    form.resetFields();

    pushDataToDb(firebaseDb, 'prices', price);

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
        label="Івент:"
        rules={[
          { required: true, message: 'Необхідно обрати івент' },
        ]}
      >
        <Select>
          {filteredEvents?.map((val) => (
            <Option key={val.key} value={val.eventName}>
              {val.eventName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          name="soloKayak"
          label="За одномісний:"
          rules={[
            { required: true, message: 'Поле є обов\'язковим для заповнення' },
          ]}
        >
          <InputNumber min="1" />
        </Form.Item>
        <Form.Item
          name="doubleKayak"
          label="За двомісний:"
          tooltip="Для дитини (на дитячому сидінні) вартість буде становити від половини вказаної вартості"
          rules={[
            { required: true, message: 'Поле є обов\'язковим для заповнення' },
          ]}
        >
          <InputNumber min="1" />
        </Form.Item>
      </div>
    </Form>
  );
}

export default PricesForm;

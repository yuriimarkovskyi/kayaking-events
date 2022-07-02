import {
  Form, InputNumber, message, Select,
} from 'antd';
import React from 'react';
import { IEvent, IPriceBoats } from 'types';
import { pushDataToDb } from 'utils/dbActions';

interface Props {
  closeDrawer: () => void;
  events: IEvent[] | undefined;
}

function PricesBoatsForm({
  closeDrawer,
  events,
}: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const eventNameWatch = Form.useWatch('eventName', form);

  const {
    soloKayaks: isSoloKayaksAvailable,
    doubleKayaks: isDoubleKayaksAvailable,
    sups: isSupsAvailable,
  } = events?.find((val) => val.eventName === eventNameWatch)?.availableBoats || {};

  const onFinish = (values: any) => {
    const {
      eventName,
      soloKayaks,
      doubleKayaks,
      sups,
    } = values;

    const price: IPriceBoats = {
      key: Date.now(),
      eventName,
      soloKayaks,
      doubleKayaks,
      sups,
    };

    form.resetFields();

    pushDataToDb('pricesBoats', price);

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
      name="prices-form"
      layout="vertical"
      form={form}
      initialValues={{
        soloKayaks: 0,
        doubleKayaks: 0,
        sups: 0,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="eventName"
        label="Подія:"
        rules={[
          { required: true },
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
      <Form.Item
        name="soloKayaks"
        label="За одномісний каяк:"
        hidden={!isSoloKayaksAvailable}
        rules={[
          { required: !!isSoloKayaksAvailable },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="doubleKayaks"
        label="За двомісний каяк:"
        tooltip="Для дитини (на дитячому сидінні) вартість буде становити половину від вказаної вартості"
        hidden={!isDoubleKayaksAvailable}
        rules={[
          { required: !!isDoubleKayaksAvailable },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="sups"
        label="За сап:"
        hidden={!isSupsAvailable}
        rules={[
          { required: !!isSupsAvailable },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
    </Form>
  );
}

export default PricesBoatsForm;

import {
  Form, InputNumber, Select,
} from 'antd';
import React from 'react';
import { IEvent, IPriceBoats } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';

interface Props {
  closeDrawer: () => void;
  events: IEvent[] | undefined;
}

function PricesBoatsForm({
  closeDrawer,
  events,
}: Props) {
  const { useForm, useWatch, Item } = Form;
  const [form] = useForm();
  const { Option } = Select;

  const eventNameWatch = useWatch('eventName', form);

  const {
    soloKayaks: isSoloKayaksAvailable,
    doubleKayaks: isDoubleKayaksAvailable,
    sups: isSupsAvailable,
  } = events?.find((val) => val.eventName === eventNameWatch)?.availableBoats || {};

  const onFinish = (values: any) => {
    const {
      eventName,
      soloKayak,
      doubleKayak,
      sup,
    } = values;

    const price: IPriceBoats = {
      key: Date.now(),
      eventName,
      soloKayak: soloKayak || 0,
      doubleKayak: doubleKayak || 0,
      sup: sup || 0,
    };

    form.resetFields();
    pushDataToDb('prices/boats', price)
      .then(() => messageSuccess('Прайс доданий'));
    closeDrawer();
  };

  return (
    <Form
      id="prices-boats-form"
      className="form"
      name="prices-boats-form"
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      <Item
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
      </Item>
      <Item
        name="soloKayak"
        label="Одномісний каяк:"
        hidden={!isSoloKayaksAvailable}
        rules={[
          { required: !!isSoloKayaksAvailable },
        ]}
      >
        <InputNumber min={1} />
      </Item>
      <Item
        name="doubleKayak"
        label="Двомісний каяк:"
        hidden={!isDoubleKayaksAvailable}
        rules={[
          { required: !!isDoubleKayaksAvailable },
        ]}
      >
        <InputNumber min={1} />
      </Item>
      <Item
        name="sup"
        label="Сап:"
        hidden={!isSupsAvailable}
        rules={[
          { required: !!isSupsAvailable },
        ]}
      >
        <InputNumber min={1} />
      </Item>
    </Form>
  );
}

export default PricesBoatsForm;

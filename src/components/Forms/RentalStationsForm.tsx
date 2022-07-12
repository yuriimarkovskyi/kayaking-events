import {
  Form, Input, InputNumber,
} from 'antd';
import React from 'react';
import { IRentalStation } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';
import validateMessages from 'utils/validateMessages';

interface Props {
  closeDrawer: () => void;
}

function RentalStationsForm({ closeDrawer }: Props) {
  const { useForm, Item } = Form;
  const [form] = useForm();

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
        neopreneSkirts,
        nylonSkirts,
        waterproofCases,
      },
    };

    form.resetFields();
    pushDataToDb('rentalStations', rentalStation)
      .then(() => messageSuccess('Станція прокату додана'));
    closeDrawer();
  };

  return (
    <Form
      id="rental-stations-form"
      className="form"
      name="rental-stations-form"
      layout="vertical"
      form={form}
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
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Item
        name="rentalName"
        label="Станція:"
        rules={[
          { required: true },
          { whitespace: true },
          { pattern: /[А-Яа-яїЇ]/ },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="address"
        label="Адреса:"
        tooltip="Посилання на гугл карти"
        rules={[
          {
            type: 'url',
            required: true,
          },
          { whitespace: true },
          {
            pattern: /^(https:\/\/)(goo.gl\/)(maps\/)[A-Za-z0-9]*/,
            message: 'Посилання має вести на гугл карти',
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="soloKayaks"
        label="Одномісних каяків:"
        tooltip="Тут і надалі необхідно вказати кількість, що доступна саме для проведення подій"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="doubleKayaks"
        label="Двомісних каяків:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="sups"
        label="Дошок:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="childSeats"
        label="Дитячих сидінь:"
        tooltip="Тут і надалі необхідно вказати кількість, що доступна для видачі клієнтам на подіях"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="carbonPaddles"
        label="Карбонових весел:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="neopreneSkirts"
        label="Неопренових спідниць:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="nylonSkirts"
        label="Нейлонових спідниць:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
      <Item
        name="waterproofCases"
        label="Водонепроникних кейсів:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={0} />
      </Item>
    </Form>
  );
}

export default RentalStationsForm;

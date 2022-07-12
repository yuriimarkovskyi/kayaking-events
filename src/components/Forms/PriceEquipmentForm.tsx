import { Form, InputNumber } from 'antd';
import React from 'react';
import { IPriceEquipment } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';

interface Props {
  closeDrawer: () => void;
}

function PricesEquipmentForm({ closeDrawer }: Props) {
  const {
    useForm,
    Item,
  } = Form;
  const [form] = useForm();

  const onFinish = (values: any) => {
    const {
      childSeat,
      carbonPaddle,
      neopreneSkirt,
      nylonSkirt,
      waterproofCase,
    } = values;

    const price: IPriceEquipment = {
      key: Date.now(),
      childSeat,
      carbonPaddle,
      neopreneSkirt,
      nylonSkirt,
      waterproofCase,
    };

    form.resetFields();
    pushDataToDb('prices/equipment', price)
      .then(() => messageSuccess('Прайс доданий'));
    closeDrawer();
  };

  return (
    <Form
      id="prices-equipment-form"
      className="form"
      name="prices-equipment-form"
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      <Item
        className="form__item"
        name="childSeat"
        label="Дитяче сидіння:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={1} />
      </Item>
      <Item
        className="form__item"
        name="carbonPaddle"
        label="Карбонове весло:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={1} />
      </Item>
      <Item
        className="form__item"
        name="neopreneSkirt"
        label="Неопренова спідниця:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={1} />
      </Item>
      <Item
        className="form__item"
        name="nylonSkirt"
        label="Нейлонова спідниця:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={1} />
      </Item>
      <Item
        className="form__item"
        name="waterproofCase"
        label="Водонепроникний кейс:"
        rules={[
          { required: true },
        ]}
      >
        <InputNumber min={1} />
      </Item>
    </Form>
  );
}

export default PricesEquipmentForm;

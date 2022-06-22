import React from 'react';
import {
  Button, Checkbox, Form, Input, InputNumber, message, Select, Typography,
} from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { db } from 'config/firebase';
import { pushDataToDb } from 'helpers/pushDataToDb';
import {
  ICustomer, IDate, IEvent, IPrice,
} from 'types';
import eventPrice from 'helpers/eventPrice';

interface Props {
  currentEvent: IEvent[] | undefined;
  dates: IDate[] | undefined;
  price: IPrice[] | undefined;
  closeModal: () => void;
}

function RegistrationForm({
  currentEvent,
  dates,
  price,
  closeModal,
}: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Text } = Typography;

  const dateWatcher = Form.useWatch('eventDate', form);
  const soloKayaksWatcher = Form.useWatch('soloKayaks', form);
  const doubleKayaksWatcher = Form.useWatch('doubleKayaks', form);
  const isChildrenWatcher = Form.useWatch('isChildren', form);
  const childrenAmountWatcher = Form.useWatch('childrenAmount', form);

  const eventName = currentEvent?.map((val) => val.eventName)
    .toString();
  const chosenDate = dates?.find((val) => val.date === dateWatcher);
  const placesSolo = chosenDate?.freePlaces.soloKayaks;
  const placesDouble = chosenDate?.freePlaces.doubleKayaks;

  const priceSolo = Number(price?.map((val) => val.soloKayak)
    .toString());
  const priceDouble = Number(price?.map((val) => val.doubleKayak)
    .toString());

  const amount = eventPrice(
    isChildrenWatcher,
    soloKayaksWatcher,
    doubleKayaksWatcher,
    priceSolo,
    priceDouble,
    childrenAmountWatcher,
  );

  const onFinish = (values: any) => {
    const {
      fullName,
      email,
      phone,
      eventDate,
      soloKayaks,
      doubleKayaks,
      isChildren,
      childrenAmount,
      notes,
    } = values;

    const customer: ICustomer = {
      key: Date.now(),
      eventName: eventName || '',
      registrationTime: Date.now(),
      fullName,
      email,
      phone,
      eventDate,
      soloKayaks,
      doubleKayaks,
      isChildren,
      childrenAmount: isChildrenWatcher ? childrenAmount : 0,
      amount,
      notes: notes || '',
      isCompleted: false,
      isRejected: false,
      rejectedReason: '',
    };

    form.resetFields();

    pushDataToDb(db, 'registrations', customer);

    message.success({
      content: 'Ви успішно зареєструвались',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeModal();
  };

  return (
    <Form
      className="registration-form form"
      form={form}
      layout="vertical"
      name="registration-form"
      onFinish={onFinish}
      initialValues={{
        soloKayaks: 0,
        doubleKayaks: 0,
        isChildren: false,
        childrenAmount: 1,
      }}
    >
      <Form.Item
        className="form__item"
        name="fullName"
        label="ПІБ:"
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
            max: 120,
            message: 'Поле може містити у собі максимум 120 символів',
          },
          {
            pattern: /[A-Za-zА-Яа-яїЇ]/,
            message: 'У полі присутні неприпустимі символи',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="email"
        label="E-mail:"
        rules={[
          {
            type: 'email',
            message: 'Введіть коректний E-mail',
          },
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="phone"
        label="Номер телефону:"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            pattern: /^([5-9][0-9]\d{7})$/,
            message: 'Вкажіть коректний номер телефону',
          },
          {
            min: 9,
            message: 'Поле має містити у собі 9 символів',
          },
          {
            max: 9,
            message: 'Поле має містити у собі 9 символів',
          },
        ]}
      >
        <Input addonBefore="+380" />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="eventDate"
        label="Дата:"
        rules={[
          {
            required: true,
            message: 'Необхідно обрати дату походу',
          },
        ]}
      >
        <Select>
          {dates?.map((val) => (
            <Option key={val.date} value={val.date}>
              {moment.unix(val.date)
                .locale('uk')
                .format('L')}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          name="soloKayaks"
          label="Одномісних каяків:"
          extra={dateWatcher ? `На обрану дату доступно ${placesSolo} одномісних каяків` : null}
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber
            disabled={!dateWatcher}
            min={0}
            max={placesSolo}
          />
        </Form.Item>
        <Form.Item
          name="doubleKayaks"
          label="Двомісних каяків:"
          extra={dateWatcher ? `На обрану дату доступно ${placesDouble} двомісних каяків` : null}
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber
            disabled={!dateWatcher}
            min={0}
            max={placesDouble}
          />
        </Form.Item>
      </div>
      <Form.Item
        className="form__item"
        name="isChildren"
        valuePropName="checked"
      >
        <Checkbox disabled={!doubleKayaksWatcher}>
          Потрібне дитяче сидіння у двомісний каяк
        </Checkbox>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="childrenAmount"
        hidden={!isChildrenWatcher}
        label="Кількість дітей:"
        tooltip="Сидіння ставиться між переднім та заднім сидіннями у каяку. На дитину діє знижка у розмірі 50% від вартості місця"
        rules={[
          {
            required: !isChildrenWatcher,
            message: 'Поле є обов\'язковим для заповнення',
          },
        ]}
      >
        <InputNumber
          min={1}
          max={doubleKayaksWatcher}
        />
      </Form.Item>
      <Form.Item
        className="form__item"
        hidden={!dateWatcher}
        label="Вартість:"
      >
        <Text strong>
          {`${amount} ГРН`}
        </Text>
      </Form.Item>
      <Form.Item
        name="notes"
        label="Нотатки:"
        rules={[
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={75} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
        >
          Зареєструватись
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;

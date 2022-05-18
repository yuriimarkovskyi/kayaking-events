import React from 'react';
import {
  Button, Checkbox, Form, Input, InputNumber, Select, Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/uk';
import { addCustomer } from '../store/registrationsSlice';

// import { changeVisibility } from '../store/visibilitySlice';

function RegistrationForm() {
  const { Option } = Select;
  const { Text } = Typography;
  const [form] = Form.useForm();

  const { link } = useParams();
  const dispatch = useDispatch();

  const eventDateValue = Form.useWatch('eventDate', form);
  const soloKayaksValue = Form.useWatch('soloKayaks', form);
  const doubleKayaksValue = Form.useWatch('doubleKayaks', form);
  const isChildren = Form.useWatch('children', form);
  const childrenAmountValue = Form.useWatch('childrenAmount', form);

  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((el) => el.link === link);
  const eventName = currentEvent.map((el) => el.name).toString();

  const selectedDate = currentEvent.map((el) => (
    el.dates.filter((date) => date.date === eventDateValue)));
  const freePlacesSoloKayaks = Number(selectedDate.flat().map((el) => (
    el.freePlaces.soloKayaks)));
  const freePlacesDoubleKayaks = Number(selectedDate.flat().map((el) => (
    el.freePlaces.doubleKayaks)));
  const price = currentEvent.flatMap((el) => el.price);
  const priceSoloKayak = Number(price.filter((el) => el.id === 'soloKayak').map((item) => (
    item.price)));
  const priceDoubleKayak = Number(price.filter((el) => el.id === 'doubleKayak').map((item) => (
    item.price)));

  const priceTotal = priceSoloKayak * soloKayaksValue + priceDoubleKayak * doubleKayaksValue * 2;
  const amount = isChildren
    ? priceTotal + (childrenAmountValue * priceDoubleKayak) / 2
    : priceTotal;

  const onFinish = (values) => {
    const customer = {
      id: Date.now(),
      eventName,
      registrationTime: Date.now(),
      eventDate: values.eventDate,
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: `+380${values.customerPhone}`,
      soloKayaks: values.soloKayaks,
      doubleKayaks: values.doubleKayaks,
      amount,
      children: values.children,
      childrenAmount: isChildren ? values.childrenAmount : 0,
      notes: values.notes,
      isCompleted: false,
    };
    console.log(customer);
    // form.resetFields();
    dispatch(addCustomer(customer));
    // dispatch(changeVisibility());
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="registration-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        className="registration-form__item"
        name="customerName"
        label="ПІБ:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { whitespace: true, message: 'Поле не може містити у собі лише пробіли' },
          { min: 6, message: 'Поле має містити у собі мінімум 6 символів' },
          { max: 120, message: 'Поле може містити у собі максимум 120 символів' },
          { pattern: /[A-Za-zА-Яа-яїЇёЁ]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="customerEmail"
        label="E-mail:"
        rules={[
          { type: 'email', message: 'Введіть коректний E-mail' },
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="customerPhone"
        label="Номер телефону:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { pattern: /^([5-9][0-9]\d{7})$/, message: 'Номер телефону має бути в українському форматі' },
          { min: 9, message: 'Поле має містити у собі 9 символів' },
          { max: 9, message: 'Поле має містити у собі 9 символів' },
        ]}
      >
        <Input addonBefore="+380" />
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="eventDate"
        label="Дата івенту:"
        rules={[
          { required: true, message: 'Необхідно обрати дату походу' },
        ]}
      >
        <Select>
          {currentEvent.map((item) => item.dates.map((date) => (
            <Option key={date.date} value={date.date}>
              {moment(date.date).locale('uk').format('LL')}
            </Option>
          )))}
        </Select>
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="soloKayaks"
        initialValue={0}
        label="Одномісних каяків:"
        tooltip={eventDateValue ? `На обрану дату доступно ${freePlacesSoloKayaks} одномісних каяків` : null}
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <InputNumber
          disabled={!eventDateValue}
          min={0}
          max={freePlacesSoloKayaks}
        />
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="doubleKayaks"
        initialValue={0}
        label="Двомісних каяків:"
        tooltip={eventDateValue ? `На обрану дату доступно ${freePlacesDoubleKayaks} двомісних каяків` : null}
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <InputNumber
          disabled={!eventDateValue}
          min={0}
          max={freePlacesDoubleKayaks}
        />
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="children"
        valuePropName="checked"
      >
        <Checkbox disabled={!doubleKayaksValue}>
          Потрібне дитяче сидіння у двомісний каяк
        </Checkbox>
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="childrenAmount"
        hidden={!isChildren}
        initialValue={1}
        label="Кількість дітей:"
        tooltip="Сидіння ставиться між переднім та заднім сидіннями у каяку. На дитину діє знижка у розмірі 50% від вартості місця"
        rules={[
          { required: !!isChildren, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <InputNumber
          min={1}
          max={doubleKayaksValue}
        />
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        hidden={!eventDateValue}
        label="Вартість:"
      >
        <Text strong>
          {`${(amount || 0)} ГРН`}
        </Text>
      </Form.Item>
      <Form.Item
        className="registration-form__item"
        name="notes"
        label="Примітки:"
        rules={[
          { whitespace: true, message: 'Поле не може містити у собі лише пробіли' },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
        >
          Зареєструватись
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;

import React from 'react';
import {
  Button, Checkbox, Form, Input, InputNumber, message, Select, Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/uk';
import { changeVisibility } from '../store/visibilitySlice';
import { useWatchValues } from '../hooks/useWatchValues';
import { firebaseDatabase } from '../firebase/firebase';
import { pushDataToBase } from '../helpers/pushDataToBase';

function RegistrationForm() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Text } = Typography;

  const { link } = useParams();
  const dispatch = useDispatch();
  const [
    dateWatcher,
    soloKayaksWatcher,
    doubleKayaksWatcher,
    isChildrenWatcher,
    childrenAmountWatcher,
  ] = useWatchValues(['eventDate', 'soloKayaks', 'doubleKayaks', 'isChildren', 'childrenAmount'], form);

  const events = useSelector((state) => state.events);
  const currentEvent = events.filter((el) => el.link === link);
  const eventName = currentEvent.map((el) => el.name).toString();

  const selectedDate = currentEvent.map((el) => (
    el.dates.filter((date) => date.date === dateWatcher)));
  const freePlacesSoloKayaks = Number(selectedDate.flat().map((el) => (
    el.freePlaces.soloKayaks)));
  const freePlacesDoubleKayaks = Number(selectedDate.flat().map((el) => (
    el.freePlaces.doubleKayaks)));
  const price = currentEvent.flatMap((el) => el.price);
  const priceSoloKayak = Number(price.filter((el) => el.id === 'soloKayak').map((item) => (
    item.price)));
  const priceDoubleKayak = Number(price.filter((el) => el.id === 'doubleKayak').map((item) => (
    item.price)));

  const priceTotal = (
    priceSoloKayak * soloKayaksWatcher + priceDoubleKayak * doubleKayaksWatcher * 2
  );
  const amount = isChildrenWatcher
    ? priceTotal + (childrenAmountWatcher * priceDoubleKayak) / 2
    : priceTotal;

  const onFinish = (values) => {
    const {
      name, email, phone, eventDate, soloKayaks, doubleKayaks, isChildren, childrenAmount, notes,
    } = values;

    const customer = {
      key: Date.now(),
      eventName,
      registrationTime: Date.now(),
      name,
      email,
      phone,
      eventDate,
      soloKayaks,
      doubleKayaks,
      isChildren,
      childrenAmount: isChildrenWatcher ? childrenAmount : null,
      amount,
      notes,
      isCompleted: false,
    };

    form.resetFields();
    pushDataToBase(firebaseDatabase, 'registrations', customer);
    message.success({
      content: 'Ви успішно зареєструвались',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });
    dispatch(changeVisibility());
  };

  return (
    <Form
      className="registration-form form"
      form={form}
      layout="vertical"
      name="registration-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        className="form__item"
        name="name"
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
        className="form__item"
        name="email"
        label="E-mail:"
        rules={[
          { type: 'email', message: 'Введіть коректний E-mail' },
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="phone"
        label="Номер телефону:"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
          { pattern: /^([5-9][0-9]\d{7})$/, message: 'Вкажіть коректний номер телефону' },
          { min: 9, message: 'Поле має містити у собі 9 символів' },
          { max: 9, message: 'Поле має містити у собі 9 символів' },
        ]}
      >
        <Input addonBefore="+380" />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="eventDate"
        label="Дата івенту:"
        rules={[
          { required: true, message: 'Необхідно обрати дату походу' },
        ]}
      >
        <Select>
          {currentEvent.map((item) => item.dates.map((date) => (
            <Option key={date.date} value={date.date}>
              {moment.unix(date.date).locale('uk').format('L')}
            </Option>
          )))}
        </Select>
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          wrapperCol
          name="soloKayaks"
          label="Одномісних каяків:"
          extra={dateWatcher ? `На обрану дату доступно ${freePlacesSoloKayaks} одномісних каяків` : null}
          initialValue={0}
          rules={[
            { required: true, message: 'Поле є обов\'язковим для заповнення' },
          ]}
        >
          <InputNumber
            disabled={!dateWatcher}
            min={0}
            max={freePlacesSoloKayaks}
          />
        </Form.Item>
        <Form.Item
          name="doubleKayaks"
          initialValue={0}
          label="Двомісних каяків:"
          extra={dateWatcher ? `На обрану дату доступно ${freePlacesDoubleKayaks} двомісних каяків` : null}
          rules={[
            { required: true, message: 'Поле є обов\'язковим для заповнення' },
          ]}
        >
          <InputNumber
            disabled={!dateWatcher}
            min={0}
            max={freePlacesDoubleKayaks}
          />
        </Form.Item>
      </div>
      <Form.Item
        className="form__item"
        name="isChildren"
        initialValue={false}
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
        initialValue={1}
        label="Кількість дітей:"
        tooltip="Сидіння ставиться між переднім та заднім сидіннями у каяку. На дитину діє знижка у розмірі 50% від вартості місця"
        rules={[
          { required: !isChildrenWatcher, message: 'Поле є обов\'язковим для заповнення' },
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
          {`${(amount || 0)} ГРН`}
        </Text>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="notes"
        initialValue={null}
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
          block
        >
          Зареєструватись
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;

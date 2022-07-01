import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Input, message, Select,
} from 'antd';
import { URL } from 'config';
import { db } from 'config/firebase';
import { ref as ref_db } from 'firebase/database';
import React from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { IEvent, IRentalStation } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import validateMessages from 'utils/validateMessages';

interface Props {
  closeDrawer: () => void;
}

function EventsForm({ closeDrawer }: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const rentalStationWatcher = Form.useWatch('rentalStation', form);

  const [rentalStations] = useListVals<IRentalStation>(ref_db(db, 'rentalStations'));
  const chosenStation = rentalStations?.find((val) => val.rentalName === rentalStationWatcher);
  const {
    soloKayaks: isSoloKayaksPlaces,
    doubleKayaks: isDoubleKayaksPlaces,
    sups: isSupsPlaces,
  } = chosenStation?.totalPlaces || {};

  const onFinish = (values: any) => {
    const {
      eventName,
      rentalStation,
      link,
      routeMap,
      title,
      description,
      features,
      isSoloKayaks,
      isDoubleKayaks,
      isSups,
      cover,
    } = values;

    const event: IEvent = {
      key: Date.now(),
      eventName,
      rentalStation,
      link,
      routeMap,
      title,
      description,
      features,
      availableBoats: {
        soloKayaks: !!isSoloKayaks,
        doubleKayaks: !!isDoubleKayaks,
        sups: !!isSups,
      },
      cover,
    };

    form.resetFields();

    pushDataToDb('events', event);

    message.success({
      content: 'Подія додана',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeDrawer();
  };

  return (
    <Form
      id="events-form"
      className="form"
      name="events-form"
      layout="vertical"
      form={form}
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="eventName"
        label="Подія:"
        tooltip="Коротка узагальнююча назва, повну назву необхідно буде вказати у полі 'Заголовок'"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 4 },
          { max: 25 },
          { pattern: /[А-Яа-яїЇ]/ },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="rentalStation"
        label="Станція проведення:"
        tooltip="Станція з якої стартує подія або звідки береться спорядження для події"
        rules={[
          { required: true },
        ]}
      >
        <Select>
          {rentalStations?.map((val) => (
            <Option key={val.key} value={val.rentalName}>
              {val.rentalName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="link"
        label="Лінк:"
        tooltip="Лінк за яким буде доступна сторінка події на сайті"
        rules={[
          { required: true },
          { min: 4 },
          { max: 25 },
          { whitespace: true },
          { pattern: /[A-Za-z]/ },
        ]}
      >
        <Input addonBefore={`${URL}/event/`} />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="routeMap"
        label="Карта маршруту:"
        tooltip="Посилання на активність у Страві"
        rules={[
          {
            type: 'url',
            required: true,
          },
          { whitespace: true },
          { pattern: /^(https:\/\/)(www.strava.com\/)(activities\/)[0-9]*/ },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="title"
        label="Заголовок:"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 6 },
          { max: 60 },
          { pattern: /[А-Яа-яїЇ]/ },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="description"
        label="Опис:"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 6 },
          { max: 200 },
          { pattern: /[А-Яа-яїЇ]/ },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.List
        name="features"
      >
        {(fields, {
          add,
          remove,
        }) => (
          <>
            {fields.map(({
              key,
              name,
              ...restField
            }) => (
              <div className="form__list" key={key}>
                <Form.Item
                  {...restField}
                  name={[name]}
                  rules={[
                    { required: true },
                  ]}
                  style={{ width: '100%' }}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Ключові особливості
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        className="form__item"
        name="isSoloKayaks"
        label="Доступні для вибору плавзасоби:"
        valuePropName="checked"
      >
        <Checkbox
          disabled={!isSoloKayaksPlaces}
        >
          Одномісні каяки
        </Checkbox>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="isDoubleKayaks"
        valuePropName="checked"
      >
        <Checkbox
          disabled={!isDoubleKayaksPlaces}
        >
          Двомісні каяки
        </Checkbox>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="isSups"
        valuePropName="checked"
      >
        <Checkbox
          disabled={!isSupsPlaces}
        >
          Сапи
        </Checkbox>
      </Form.Item>
      <Form.Item
        className="form__item"
        name="cover"
        label="Обкладинка:"
        tooltip="Посилання на папку з обкладинкою"
        rules={[
          { required: true },
          { whitespace: true },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default EventsForm;

import 'moment/locale/uk';

import {
  Button, Checkbox, Form, Input, InputNumber, message, Select, Typography,
} from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import {
  ICustomer, IDate, IEvent, IPriceBoats,
} from 'types';
import { pushDataToDb, updateDataInDb } from 'utils/dbActions';
import eventPrice from 'utils/eventPrice';
import validateMessages from 'utils/validateMessages';

interface Props {
  currentEvent: IEvent[] | undefined;
  dates: IDate[] | undefined;
  price: IPriceBoats[] | undefined;
  // closeModal: () => void;
}

function RegistrationForm({
  currentEvent,
  dates,
  price,
  // closeModal,
}: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Text } = Typography;

  const eventDateWatch = Form.useWatch('eventDate', form);
  const soloKayaksWatch = Form.useWatch('soloKayaks', form);
  const doubleKayaksWatch = Form.useWatch('doubleKayaks', form);
  const equipmentWatch = Form.useWatch('equipment', form);
  const isChildSeatsWatch = Form.useWatch('isChildSeats', form);
  const carbonPaddlesWatch = Form.useWatch('isCarbonPaddles', form);
  const neopreneSkirtsWatch = Form.useWatch('isNeopreneSkirts', form);
  const nylonSkirtsWatch = Form.useWatch('isNylonSkirts', form);
  const waterproofCasesWatch = Form.useWatch('isWaterproofCases', form);
  const childSeatsWatch = Form.useWatch('childSeats', form);

  useEffect(() => {
    form.setFieldsValue({
      isChildSeats: false,
      isCarbonPaddles: false,
      isNeopreneSkirts: false,
      isNylonSkirts: false,
      isWaterproofCases: false,
    });
  }, [equipmentWatch]);

  const eventName = currentEvent?.map((val) => val.eventName)
    .toString();
  const filteredDates = dates?.filter(((val) => (
    val.freePlaces.soloKayaks
    || val.freePlaces.doubleKayaks
    || val.freePlaces.sups
  )));
  const chosenDate = dates?.find((val) => val.date === eventDateWatch);
  const {
    soloKayaks: placesSolo,
    doubleKayaks: placesDouble,
    sups: placesSups,
  } = chosenDate?.freePlaces || {};
  const {
    childSeats: freeChildSeats,
    carbonPaddles: freeCarbonPaddles,
    neopreneSkirts: freeNeopreneSkirts,
    nylonSkirts: freeNylonSkirts,
    waterproofCases: freeCases,
  } = chosenDate?.freeEquipment || {};
  const priceSolo = Number(price?.map((val) => val.soloKayaks)
    .toString());
  const priceDouble = Number(price?.map((val) => val.doubleKayaks)
    .toString());

  const amount = eventPrice(
    isChildSeatsWatch,
    soloKayaksWatch,
    doubleKayaksWatch,
    priceSolo,
    priceDouble,
    childSeatsWatch,
  );

  const updateData = (
    soloKayaks: number,
    doubleKayaks: number,
    sups: number,
    childSeats: number,
    carbonPaddles: number,
    neopreneSkirts: number,
    nylonSkirts: number,
    waterproofCases: number,
    e: number,
  ) => updateDataInDb('dates', 'key', {
    freePlaces: {
      soloKayaks,
      doubleKayaks,
      sups,
    },
    freeEquipment: {
      childSeats,
      carbonPaddles,
      neopreneSkirts,
      nylonSkirts,
      waterproofCases,
    },
  }, e);

  const onFinish = (values: any) => {
    const {
      fullName,
      email,
      phone,
      eventDate,
      soloKayaks,
      doubleKayaks,
      sups,
      childSeats,
      carbonPaddles,
      neopreneSkirts,
      nylonSkirts,
      waterproofCases,
      notes,
    } = values;

    const customer: ICustomer = {
      key: Date.now(),
      registrationTime: Date.now(),
      eventData: {
        eventName: eventName!,
        eventDate,
      },
      customerData: {
        fullName,
        email,
        phone,
      },
      boatsData: {
        soloKayaks,
        doubleKayaks,
        sups,
      },
      equipmentData: {
        childSeats,
        carbonPaddles,
        neopreneSkirts,
        nylonSkirts,
        waterproofCases,
      },
      amount,
      notes: notes || '',
      isCompleted: false,
      isRejected: false,
      rejectedReason: '',
    };

    // form.resetFields();

    pushDataToDb('registrations', customer);
    updateData(
      placesSolo! - soloKayaks,
      placesDouble! - doubleKayaks,
      placesSups! - sups,
      freeChildSeats! - childSeats,
      freeCarbonPaddles! - carbonPaddles,
      freeNeopreneSkirts! - neopreneSkirts,
      freeNylonSkirts! - nylonSkirts,
      freeCases! - waterproofCases,
      chosenDate?.key!,
    );

    message.success({
      content: 'Ви успішно зареєструвались',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    // closeModal();
  };

  return (
    <Form
      className="registration-form form"
      name="registration-form"
      layout="vertical"
      form={form}
      validateMessages={validateMessages}
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
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="fullName"
        label="ПІБ:"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 6 },
          { max: 120 },
          { pattern: /[A-Za-zА-Яа-яїЇ]/ },
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
            required: true,
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
          { required: true },
          {
            pattern: /^([5-9][0-9]\d{7})$/,
            message: 'Номер телефону має бути українського формату',
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
          {filteredDates?.map((val) => (
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
          extra={eventDateWatch && `Доступно ${placesSolo} од.`}
          hidden={!eventDateWatch || !placesSolo}
          rules={[
            { required: true },
          ]}
        >
          <InputNumber
            disabled={!eventDateWatch}
            min={0}
            max={placesSolo!}
          />
        </Form.Item>
        <Form.Item
          name="doubleKayaks"
          label="Двомісних каяків:"
          extra={eventDateWatch && `Доступно ${placesDouble} од.`}
          hidden={!eventDateWatch || !placesDouble}
          rules={[
            { required: true },
          ]}
        >
          <InputNumber
            min={0}
            max={placesDouble!}
          />
        </Form.Item>
        <Form.Item
          name="sups"
          label="Сапів:"
          extra={eventDateWatch && `Доступно ${placesSups} од.`}
          hidden={!eventDateWatch || !placesSups}
          rules={[
            { required: true },
          ]}
        >
          <InputNumber
            min={0}
            max={placesSups!}
          />
        </Form.Item>
      </div>
      <Form.Item
        className="form__item"
        name="equipment"
        valuePropName="checked"
        hidden={!eventDateWatch
          || (!freeChildSeats
            && !freeCarbonPaddles
            && !freeNeopreneSkirts
            && !freeNylonSkirts
            && !freeCases)}
      >
        <Checkbox>
          Додаткове спорядження
        </Checkbox>
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          className="form__item"
          name="isChildSeats"
          valuePropName="checked"
          hidden={!equipmentWatch || !freeChildSeats}
        >
          <Checkbox disabled={!doubleKayaksWatch}>
            Дитячі сидіння
          </Checkbox>
        </Form.Item>
        <Form.Item
          className="form__item"
          name="isCarbonPaddles"
          valuePropName="checked"
          hidden={!equipmentWatch || !freeCarbonPaddles}
        >
          <Checkbox disabled={!soloKayaksWatch}>
            Карбонові весла
          </Checkbox>
        </Form.Item>
        <Form.Item
          className="form__item"
          name="isNeopreneSkirts"
          valuePropName="checked"
          hidden={!equipmentWatch || !freeNeopreneSkirts}
        >
          <Checkbox disabled={!soloKayaksWatch}>
            Неопренові спідниці
          </Checkbox>
        </Form.Item>
        <Form.Item
          className="form__item"
          name="isNylonSkirts"
          valuePropName="checked"
          hidden={!equipmentWatch || !freeNylonSkirts}
        >
          <Checkbox disabled={!soloKayaksWatch}>
            Нейлонові спідниці
          </Checkbox>
        </Form.Item>
        <Form.Item
          className="form__item"
          name="isWaterproofCases"
          valuePropName="checked"
          hidden={!equipmentWatch || !freeCases}
        >
          <Checkbox>
            Водонепроникні кейси
          </Checkbox>
        </Form.Item>
      </div>
      <div className="registration-form__items-group">
        <Form.Item
          className="form__item"
          name="childSeats"
          hidden={!isChildSeatsWatch}
          label="Дитячих сидінь:"
          extra={`Доступно ${freeChildSeats} од.`}
          tooltip="Сидіння ставиться у двомісний каяк між переднім та заднім сидіннями. На дитину діє знижка у розмірі 50% від вартості місця"
        >
          <InputNumber
            min={0}
            max={freeChildSeats}
          />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="carbonPaddles"
          hidden={!carbonPaddlesWatch}
          label="Карбонових весел:"
          extra={`Доступно ${freeCarbonPaddles} од.`}
          tooltip="Тільки для одномісного каяка"
        >
          <InputNumber
            min={0}
            max={freeCarbonPaddles}
          />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="neopreneSkirts"
          hidden={!neopreneSkirtsWatch}
          label="Неопренових спідниць:"
          extra={`Доступно ${freeNeopreneSkirts} од.`}
          tooltip="Тільки для одномісного каяка"
        >
          <InputNumber
            min={0}
            max={freeNeopreneSkirts}
          />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="nylonSkirts"
          hidden={!nylonSkirtsWatch}
          label="Нейлонових спідниць:"
          extra={`Доступно ${freeNylonSkirts} од.`}
          tooltip="Тільки для одномісного каяка"
        >
          <InputNumber
            min={0}
            max={freeNylonSkirts}
          />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="waterproofCases"
          hidden={!waterproofCasesWatch}
          label="Водонепроникних кейсів:"
          extra={`Доступно ${freeCases} од.`}
        >
          <InputNumber
            min={0}
            max={freeCases}
          />
        </Form.Item>
      </div>
      <Form.Item
        className="form__item"
        hidden={!eventDateWatch}
        label="Сума до оплати:"
      >
        <Text strong>
          {`${amount} ГРН`}
        </Text>
      </Form.Item>
      <Form.Item
        name="notes"
        label="Нотатки:"
        rules={[
          { whitespace: true },
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

import {
  DatePicker, Form, InputNumber, message, Select,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import {
  IDate, IEquipment, IEvent, IInstructor, IPlaces, IRentalStation,
} from 'types';
import { pushDataToDb } from 'utils/dbActions';
import validateMessages from 'utils/validateMessages';

interface Props {
  closeDrawer: () => void;
}

function DatesForm({ closeDrawer }: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const eventWatcher = Form.useWatch('eventName', form);

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const [instructors] = useListVals<IInstructor>(ref(db, 'instructors'));
  const [rentalStations] = useListVals<IRentalStation>(ref(db, 'rentalStations'));

  const currentStation = events?.find((val) => val.eventName === eventWatcher)?.rentalStation;
  const {
    soloKayaks: maxPlacesSolo,
    doubleKayaks: maxPlacesDouble,
    sups: maxPlacesSups,
  } = rentalStations?.find((val) => val.rentalName === currentStation)?.totalPlaces || {};
  const {
    childSeats,
    carbonPaddles,
    neopreneSkirts,
    nylonSkirts,
    waterproofCases,
  } = rentalStations?.find((val) => val.rentalName === currentStation)?.equipment || {};
  const disabledDate: RangePickerProps['disabledDate'] = (current) => current && current < moment()
    .endOf('day');

  useEffect(() => {
    form.setFieldsValue({
      soloKayaks: maxPlacesSolo,
      doubleKayaks: maxPlacesDouble,
      sups: maxPlacesSups,
    });
  }, [currentStation]);

  const onFinish = (values: any) => {
    const {
      eventName,
      date,
      soloKayaks,
      doubleKayaks,
      sups,
      instructor,
    } = values;

    const places: IPlaces = {
      soloKayaks,
      doubleKayaks,
      sups,
    };

    const equipment: IEquipment = {
      childSeats: childSeats!,
      carbonPaddles: carbonPaddles!,
      neopreneSkirts: neopreneSkirts!,
      nylonSkirts: nylonSkirts!,
      waterproofCases: waterproofCases!,
    };

    const eventDate: IDate = {
      key: Date.now(),
      eventName,
      date: Number(moment(date)
        .format('X')),
      totalPlaces: places,
      freePlaces: places,
      totalEquipment: equipment,
      freeEquipment: equipment,
      instructor,
    };

    form.resetFields();

    pushDataToDb('dates', eventDate);

    message.success({
      content: 'Дата додана',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeDrawer();
  };

  return (
    <Form
      id="dates-form"
      className="form"
      name="dates-form"
      layout="vertical"
      form={form}
      scrollToFirstError
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="eventName"
        label="Івент:"
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
        className="form__item"
        name="date"
        label="Дата проведення:"
        rules={[
          {
            required: true,
            message: 'Необхідно обрати дату події',
          },
        ]}
      >
        <DatePicker disabledDate={disabledDate} />
      </Form.Item>
      <Form.Item
        name="soloKayaks"
        label="Одномісних каяків:"
        extra={eventWatcher && `Максимум ${maxPlacesSolo} од.`}
      >
        <InputNumber
          disabled={!maxPlacesSolo}
          min={0}
          max={maxPlacesSolo}
        />
      </Form.Item>
      <Form.Item
        name="doubleKayaks"
        label="Двомісних каяків:"
        extra={eventWatcher && `Максимум ${maxPlacesDouble} од.`}
      >
        <InputNumber
          disabled={!maxPlacesDouble}
          min={0}
          max={maxPlacesDouble}
        />
      </Form.Item>
      <Form.Item
        name="sups"
        label="Сапів:"
        extra={eventWatcher && `Максимум ${maxPlacesSups} од.`}
      >
        <InputNumber
          disabled={!maxPlacesSups}
          min={0}
          max={maxPlacesSups}
        />
      </Form.Item>
      <Form.Item
        name="instructor"
        label="Інструктор:"
        rules={[
          { required: true },
        ]}
      >
        <Select>
          {instructors?.map((val) => (
            <Option key={val.key} value={val.name}>
              {val.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}

export default DatesForm;

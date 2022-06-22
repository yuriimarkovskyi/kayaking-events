import React from 'react';
import {
  DatePicker, Form, InputNumber, message, Select,
} from 'antd';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { db } from 'config/firebase';
import type { RangePickerProps } from 'antd/es/date-picker';
import {
  IDate, IEvent, IInstructor, IRentalStation,
} from 'types';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import moment from 'moment';

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
  const maxPlaces = rentalStations?.find((val) => val.rentalName === currentStation)?.totalPlaces;

  const disabledDate: RangePickerProps['disabledDate'] = (current) => current && current < moment()
    .endOf('day');
  const onFinish = (values: any) => {
    const {
      eventName,
      date,
      soloKayaks,
      doubleKayaks,
      instructor,
    } = values;

    const dateObj: IDate = {
      key: Date.now(),
      eventName,
      date: Number(moment(date)
        .format('X')),
      totalPlaces: {
        soloKayaks,
        doubleKayaks,
      },
      freePlaces: {
        soloKayaks,
        doubleKayaks,
      },
      instructor,
    };

    form.resetFields();

    pushDataToDb(db, 'dates', dateObj);

    message.success({
      content: 'Інструктор доданий',
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
      form={form}
      layout="vertical"
      name="dates-form"
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="eventName"
        label="Івент:"
        rules={[
          {
            required: true,
            message: 'Необхідно обрати івент',
          },
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
            type: 'object',
            required: true,
            message: 'Необхідно обрати дату',
          },
        ]}
      >
        <DatePicker disabledDate={disabledDate} />
      </Form.Item>
      <div className="registration-form__items-group">
        <Form.Item
          name="soloKayaks"
          label="Одномісних каяків:"
          extra={eventWatcher ? `Максимальна кількість каяків складає ${maxPlaces?.soloKayaks} од.` : null}
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber
            min={1}
            max={maxPlaces?.soloKayaks}
          />
        </Form.Item>
        <Form.Item
          name="doubleKayaks"
          label="Двомісних каяків:"
          extra={eventWatcher ? `Максимальна кількість каяків складає ${maxPlaces?.doubleKayaks} од.` : null}
          rules={[
            {
              required: true,
              message: 'Поле є обов\'язковим для заповнення',
            },
          ]}
        >
          <InputNumber
            min={1}
            max={maxPlaces?.doubleKayaks}
          />
        </Form.Item>
      </div>
      <Form.Item
        className="form__item"
        name="instructor"
        label="Інструктор:"
        rules={[
          {
            required: true,
            message: 'Необхідно обрати інструктора',
          },
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

import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Input, message, Select, Upload,
} from 'antd';
import { URL } from 'config';
import { db, storage } from 'config/firebase';
import { ref as ref_db } from 'firebase/database';
import { getDownloadURL, ref as ref_storage, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ICategory, IEvent, IRentalStation } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';
import validateMessages from 'utils/validateMessages';

interface Props {
  closeDrawer: () => void;
}

function EventsForm({ closeDrawer }: Props) {
  const {
    useForm,
    useWatch,
    Item,
  } = Form;
  const [form] = useForm();
  const { Option } = Select;

  const rentalStationWatcher = useWatch('rentalStation', form);

  const [categories] = useListVals<ICategory>(ref_db(db, 'categories'));
  const [rentalStations] = useListVals<IRentalStation>(ref_db(db, 'rentalStations'));
  const chosenStation = rentalStations?.find((val) => val.rentalName === rentalStationWatcher);
  const {
    soloKayaks: isSoloKayaksPlaces,
    doubleKayaks: isDoubleKayaksPlaces,
    sups: isSupsPlaces,
  } = chosenStation?.totalPlaces || {};

  const coverEvent = (e: any) => e.file;

  const onFinish = async (values: any) => {
    const {
      eventName,
      categoryName,
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

    const modifiedLink = link.replace(/\s/g, '');

    const event: IEvent = {
      key: Date.now(),
      eventName,
      categoryName,
      rentalStation,
      link: modifiedLink,
      routeMap,
      title,
      description,
      features,
      availableBoats: {
        soloKayaks: !!isSoloKayaks,
        doubleKayaks: !!isDoubleKayaks,
        sups: !!isSups,
      },
      cover: '',
    };

    const coverRef = ref_storage(storage, `images/events/covers/${modifiedLink}/${eventName}`);

    await uploadBytes(coverRef, cover)
      .then(() => (getDownloadURL(coverRef)
        .then((url) => {
          event.cover = url;
        }))
        .catch((err) => {
          console.error(err);
        }))
      .catch((err) => {
        console.error(err);
      });

    form.resetFields();
    pushDataToDb('events', event)
      .then(() => messageSuccess('Подія додана'));
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
      <Item
        name="eventName"
        label="Назва події:"
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
      </Item>
      <Item
        name="categoryName"
        label="Категорія події:"
        rules={[
          { required: true },
        ]}
      >
        <Select>
          {categories?.map((category) => (
            <Option key={category.key} value={category.categoryName}>
              {category.categoryName}
            </Option>
          ))}
        </Select>
      </Item>
      <Item
        name="rentalStation"
        label="Станція проведення:"
        tooltip="Станція з якої стартує подія або звідки береться спорядження для події"
        rules={[
          { required: true },
        ]}
      >
        <Select>
          {rentalStations?.map((station) => (
            <Option key={station.key} value={station.rentalName}>
              {station.rentalName}
            </Option>
          ))}
        </Select>
      </Item>
      <Item
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
      </Item>
      <Item
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
      </Item>
      <Item
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
      </Item>
      <Item
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
      </Item>
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
                <Item
                  {...restField}
                  name={[name]}
                  rules={[
                    { required: true },
                  ]}
                  style={{ width: '100%' }}
                >
                  <Input />
                </Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Ключові особливості
              </Button>
            </Item>
          </>
        )}
      </Form.List>
      <Item
        name="isSoloKayaks"
        label="Доступні для вибору плавзасоби:"
        valuePropName="checked"
      >
        <Checkbox
          disabled={!isSoloKayaksPlaces}
        >
          Одномісні каяки
        </Checkbox>
      </Item>
      <Item
        name="isDoubleKayaks"
        valuePropName="checked"
      >
        <Checkbox
          disabled={!isDoubleKayaksPlaces}
        >
          Двомісні каяки
        </Checkbox>
      </Item>
      <Item
        name="isSups"
        valuePropName="checked"
      >
        <Checkbox
          disabled={!isSupsPlaces}
        >
          Сапи
        </Checkbox>
      </Item>
      <Item
        name="cover"
        label="Обкладинка:"
        valuePropName="file"
        getValueFromEvent={coverEvent}
        tooltip="Доступні формати: png, jpg, jpeg. Розмір файлу не має перевищувати 2 мб"
        rules={[
          {
            required: true,
            message: 'Необхідно завантажити обкладинку',
          },
        ]}
      >
        <Upload
          accept=".png, .jpg, .jpeg"
          maxCount={1}
          listType="picture"
          beforeUpload={(file) => {
            const allowedExtensions = file.type === 'image/png'
              || file.type === 'image/jpg'
              || file.type === 'image/jpeg';

            if (!allowedExtensions) {
              message.error('Доступні формати: png, jpg, jpeg');

              return Upload.LIST_IGNORE;
            }

            const maxFileSize = file.size / 1024 / 1024 < 2;

            if (!maxFileSize) {
              message.error('Розмір файлу не має перевищувати 2 мб');

              return Upload.LIST_IGNORE;
            }
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>
            Завантажити
          </Button>
        </Upload>
      </Item>
    </Form>
  );
}

export default EventsForm;

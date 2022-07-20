import {
  Checkbox, Form, Input, InputNumber, Select,
} from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { IDate } from 'types';

interface Props {
  dates: IDate[] | undefined;
}

function SecondStep({ dates }: Props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const { useFormInstance, useWatch, Item } = Form;

  const form = useFormInstance();

  const isDate = useWatch('eventDate', form);
  const isSoloKayaks = useWatch('soloKayaks', form);
  const isDoubleKayaks = useWatch('doubleKayaks', form);
  const isEquipment = useWatch('isEquipment', form);
  const isChildSeats = useWatch('isChildSeats', form);
  const isCarbonPaddles = useWatch('isCarbonPaddles', form);
  const isNeopreneSkirts = useWatch('isNeopreneSkirts', form);
  const isNylonSkirts = useWatch('isNylonSkirts', form);
  const isWaterproofCases = useWatch('isWaterproofCases', form);

  useEffect(() => {
    form.setFieldsValue({
      isChildSeats: false,
      isCarbonPaddles: false,
      isNeopreneSkirts: false,
      isNylonSkirts: false,
      isWaterproofCases: false,
    });
  }, [isEquipment]);

  const chosenDate = dates?.find((val) => val.date === isDate);

  const {
    soloKayaks: placesSoloKayaks,
    doubleKayaks: placesDoubleKayaks,
    sups: placesSups,
  } = chosenDate?.freePlaces || {};

  const {
    childSeats,
    carbonPaddles,
    neopreneSkirts,
    nylonSkirts,
    waterproofCases,
  } = chosenDate?.freeEquipment || {};

  const filteredDates = dates?.filter(((val) => (
    val.freePlaces.soloKayaks
    || val.freePlaces.doubleKayaks
    || val.freePlaces.sups
  )));

  return (
    <>
      <Item
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
      </Item>
      <div className="registration-form__items-group">
        <Item
          name="soloKayaks"
          label="Одномісних каяків:"
          extra={`Доступно ${placesSoloKayaks} од.`}
          hidden={!placesSoloKayaks}
          initialValue={0}
          rules={[
            { required: true },
          ]}
        >
          <InputNumber
            disabled={!isDate}
            min={0}
            max={placesSoloKayaks!}
          />
        </Item>
        <Item
          name="doubleKayaks"
          label="Двомісних каяків:"
          extra={`Доступно ${placesDoubleKayaks} од.`}
          hidden={!placesDoubleKayaks}
          initialValue={0}
          rules={[
            { required: true },
          ]}
        >
          <InputNumber
            min={0}
            max={placesDoubleKayaks!}
          />
        </Item>
        <Item
          name="sups"
          label="Сапів:"
          extra={`Доступно ${placesSups} од.`}
          hidden={!isDate || !placesSups}
          initialValue={0}
          rules={[
            { required: true },
          ]}
        >
          <InputNumber
            min={0}
            max={placesSups!}
          />
        </Item>
      </div>
      <Item
        className="form__item"
        name="isEquipment"
        valuePropName="checked"
        hidden={!isDate
          || (!childSeats
            && !carbonPaddles
            && !neopreneSkirts
            && !nylonSkirts
            && !waterproofCases)}
      >
        <Checkbox>
          Додаткове спорядження
        </Checkbox>
      </Item>
      <div className="registration-form__items-group">
        <Item
          className="form__item"
          name="isChildSeats"
          valuePropName="checked"
          hidden={!isEquipment || !childSeats}
        >
          <Checkbox disabled={!isDoubleKayaks}>
            Дитячі сидіння
          </Checkbox>
        </Item>
        <Item
          className="form__item"
          name="isCarbonPaddles"
          valuePropName="checked"
          hidden={!isEquipment || !carbonPaddles}
        >
          <Checkbox disabled={!isSoloKayaks}>
            Карбонові весла
          </Checkbox>
        </Item>
        <Item
          className="form__item"
          name="isNeopreneSkirts"
          valuePropName="checked"
          hidden={!isEquipment || !neopreneSkirts}
        >
          <Checkbox disabled={!isSoloKayaks}>
            Неопренові спідниці
          </Checkbox>
        </Item>
        <Item
          className="form__item"
          name="isNylonSkirts"
          valuePropName="checked"
          hidden={!isEquipment || !nylonSkirts}
        >
          <Checkbox disabled={!isSoloKayaks}>
            Нейлонові спідниці
          </Checkbox>
        </Item>
        <Item
          className="form__item"
          name="isWaterproofCases"
          valuePropName="checked"
          hidden={!isEquipment || !waterproofCases}
        >
          <Checkbox>
            Водонепроникні кейси
          </Checkbox>
        </Item>
      </div>
      <div className="registration-form__items-group">
        <Item
          className="form__item"
          name="childSeats"
          hidden={!isChildSeats}
          label="Дитячих сидінь:"
          extra={`Доступно ${childSeats} од.`}
          tooltip="Сидіння ставиться у двомісний каяк між переднім та заднім сидіннями"
          initialValue={0}
        >
          <InputNumber
            min={0}
            max={childSeats}
          />
        </Item>
        <Item
          className="form__item"
          name="carbonPaddles"
          hidden={!isCarbonPaddles}
          label="Карбонових весел:"
          extra={`Доступно ${carbonPaddles} од.`}
          tooltip="Тільки для одномісного каяка"
          initialValue={0}
        >
          <InputNumber
            min={0}
            max={carbonPaddles}
          />
        </Item>
        <Item
          className="form__item"
          name="neopreneSkirts"
          hidden={!isNeopreneSkirts}
          label="Неопренових спідниць:"
          extra={`Доступно ${neopreneSkirts} од.`}
          tooltip="Тільки для одномісного каяка"
          initialValue={0}
        >
          <InputNumber
            min={0}
            max={neopreneSkirts}
          />
        </Item>
        <Item
          className="form__item"
          name="nylonSkirts"
          hidden={!isNylonSkirts}
          label="Нейлонових спідниць:"
          extra={`Доступно ${nylonSkirts} од.`}
          tooltip="Тільки для одномісного каяка"
          initialValue={0}
        >
          <InputNumber
            min={0}
            max={nylonSkirts}
          />
        </Item>
        <Item
          className="form__item"
          name="waterproofCases"
          hidden={!isWaterproofCases}
          label="Водонепроникних кейсів:"
          extra={`Доступно ${waterproofCases} од.`}
          initialValue={0}
        >
          <InputNumber
            min={0}
            max={waterproofCases}
          />
        </Item>
      </div>
      <Item
        name="notes"
        label="Нотатки:"
        rules={[
          { whitespace: true },
        ]}
      >
        <TextArea
          showCount
          maxLength={75}
          placeholder="Якщо є що сказати або запитати..."
        />
      </Item>
    </>
  );
}

export default SecondStep;

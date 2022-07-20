import { Form, Input } from 'antd';
import React from 'react';

function FirstStep() {
  const { Item } = Form;

  return (
    <>
      <Item
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
      </Item>
      <Item
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
      </Item>
      <Item
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
      </Item>
    </>
  );
}

export default FirstStep;

import React from 'react';
import { Form, Input, message } from 'antd';
import { pushDataToDb } from 'helpers/pushDataToDb';
import { firebaseDb } from 'firebaseConfig';
import { IInstructor } from 'types';

interface InstructorsFormProps {
  closeDrawer: () => void
}

function InstructorsForm({ closeDrawer }: InstructorsFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const {
      name, facebook, instagram,
    } = values;

    const instructor: IInstructor = {
      key: Date.now(),
      name,
      links: {
        facebook: facebook ? `https://www.facebook.com/${facebook}` : '-',
        instagram: instagram ? `https://www.instagram.com/${instagram}` : '-',
      },
    };

    form.resetFields();

    pushDataToDb(firebaseDb, 'instructors', instructor);

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
      id="instructors-form"
      className="form"
      form={form}
      layout="vertical"
      name="instructors-form"
      onFinish={onFinish}
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
          { pattern: /[А-Яа-яїЇ]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="facebook"
        label="Facebook:"
        rules={[
          { whitespace: true, message: 'Поле не може містити у собі лише пробіли' },
          { pattern: /[A-Za-zА\d]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input
          addonBefore="https://www.facebook.com/"
          placeholder="user"
        />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="instagram"
        label="Instagram:"
        rules={[
          { whitespace: true, message: 'Поле не може містити у собі лише пробіли' },
          { pattern: /[A-Za-zА\d]/, message: 'У полі присутні неприпустимі символи' },
        ]}
      >
        <Input
          addonBefore="https://www.instagram.com/"
          placeholder="user"
        />
      </Form.Item>
    </Form>
  );
}

export default InstructorsForm;

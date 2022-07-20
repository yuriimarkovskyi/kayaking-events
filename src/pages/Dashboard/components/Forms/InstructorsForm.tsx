import { Form, Input } from 'antd';
import React from 'react';
import { IInstructor } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';

interface Props {
  closeDrawer: () => void;
}

function InstructorsForm({ closeDrawer }: Props) {
  const { useForm, Item } = Form;
  const [form] = useForm();

  const onFinish = (values: any) => {
    const {
      name,
      facebook,
      instagram,
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
    pushDataToDb('instructors', instructor)
      .then(() => messageSuccess('Інструктор доданий'));
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
      <Item
        name="name"
        label="ПІБ:"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 6 },
          { max: 120 },
          { pattern: /[А-Яа-яїЇ]/ },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="facebook"
        label="Facebook:"
        rules={[
          { whitespace: true },
          { pattern: /[A-Za-zА\d]/ },
        ]}
      >
        <Input
          addonBefore="https://www.facebook.com/"
          placeholder="user"
        />
      </Item>
      <Item
        name="instagram"
        label="Instagram:"
        rules={[
          { whitespace: true },
          { pattern: /[A-Za-zА\d]/ },
        ]}
      >
        <Input
          addonBefore="https://www.instagram.com/"
          placeholder="user"
        />
      </Item>
    </Form>
  );
}

export default InstructorsForm;

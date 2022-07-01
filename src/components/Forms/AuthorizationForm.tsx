import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Input, Typography,
} from 'antd';
import { app } from 'config/firebase';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import validateMessages from 'utils/validateMessages';

function AuthorizationForm() {
  const { Title } = Typography;

  const auth = getAuth(app);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [form] = Form.useForm();
  const isRemember = Form.useWatch('isRemember', form);

  const onFinish = (values: any) => {
    const {
      email,
      password,
    } = values;

    if (isRemember) {
      return setPersistence(auth, browserLocalPersistence)
        .then(() => signInWithEmailAndPassword(email, password))
        .catch((error) => console.error(error));
    }
    return setPersistence(auth, browserSessionPersistence)
      .then(() => signInWithEmailAndPassword(email, password))
      .catch((error) => console.error(error));
  };

  return (
    <Form
      className="form"
      name="authorization-form"
      layout="vertical"
      form={form}
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Title className="title" level={2}>
        Форма авторизації
      </Title>
      <Form.Item
        className="form__item"
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
          },
          { whitespace: true },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="password"
        rules={[
          { required: true },
          { whitespace: true },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        name="isRemember"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox>
          Запам`ятати
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<LoginOutlined />}
          block
        >
          Авторизуватись
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AuthorizationForm;

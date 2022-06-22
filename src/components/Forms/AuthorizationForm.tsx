import {
  Button, Checkbox, Form, Input, Typography,
} from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React from 'react';
import { app } from 'config/firebase';

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
      form={form}
      layout="vertical"
      name="authorization-form"
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
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            type: 'email',
            message: 'Введіть коректний E-mail',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="password"
        rules={[
          {
            required: true,
            message: 'Поле є обов\'язковим для заповнення',
          },
          {
            whitespace: true,
            message: 'Поле не може бути пустим',
          },
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

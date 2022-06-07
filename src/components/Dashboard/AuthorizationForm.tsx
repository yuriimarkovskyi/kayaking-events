import {
  Button, Checkbox, Form, Input,
} from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import {
  browserLocalPersistence, browserSessionPersistence, getAuth, setPersistence,
} from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React from 'react';
import { firebaseApp } from '../../firebase/firebase';

function AuthorizationForm(): JSX.Element {
  const auth = getAuth(firebaseApp);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [form] = Form.useForm();
  const isRemember = Form.useWatch('remember', form);

  const onFinish = (values: any) => {
    const { email, password } = values;

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
      className="authorization-form form"
      form={form}
      layout="vertical"
      name="authorization-form"
      onFinish={onFinish}
    >
      <Form.Item
        className="form__item"
        name="email"
        rules={[
          { type: 'email', message: 'Введіть коректний E-mail' },
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        className="form__item"
        name="password"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        name="remember"
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

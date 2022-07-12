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
  const auth = getAuth(app);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const { Title } = Typography;
  const {
    useForm,
    Item,
  } = Form;
  const [form] = useForm();

  const onFinish = (values: any) => {
    const {
      email,
      password,
      isRemember,
    } = values;

    if (isRemember) {
      setPersistence(auth, browserLocalPersistence)
        .then(() => signInWithEmailAndPassword(email, password))
        .catch((error) => console.error(error));
    } else {
      setPersistence(auth, browserSessionPersistence)
        .then(() => signInWithEmailAndPassword(email, password))
        .catch((error) => console.error(error));
    }
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
      <Item
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
      </Item>
      <Item
        className="form__item"
        name="password"
        rules={[
          { required: true },
          { whitespace: true },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
      </Item>
      <Item
        name="isRemember"
        valuePropName="checked"
      >
        <Checkbox>
          Запам`ятати
        </Checkbox>
      </Item>
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<LoginOutlined />}
          block
        >
          Авторизуватись
        </Button>
      </Item>
    </Form>
  );
}

export default AuthorizationForm;

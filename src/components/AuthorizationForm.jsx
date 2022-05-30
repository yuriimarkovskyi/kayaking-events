import {
  Button, Checkbox, Form, Input,
} from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import {
  browserSessionPersistence, browserLocalPersistence, getAuth, setPersistence,
} from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseApp } from '../firebase/firebase';

function AuthorizationForm() {
  const auth = getAuth(firebaseApp);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [form] = Form.useForm();
  const isRemember = Form.useWatch('remember', form);

  const onFinish = (values) => {
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
        label="E-mail:"
        rules={[
          { type: 'email', message: 'Введіть коректний E-mail' },
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="form__item"
        label="Пароль:"
        name="password"
        rules={[
          { required: true, message: 'Поле є обов\'язковим для заповнення' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox>
          Запам`ятати мене
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<LoginOutlined />}
        >
          Авторизуватись
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AuthorizationForm;

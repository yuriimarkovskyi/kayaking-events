import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { LoginOutlined } from '@ant-design/icons';

function AuthorizationForm({ signIn }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { email, password } = values;

    signIn(email, password);
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

AuthorizationForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default AuthorizationForm;

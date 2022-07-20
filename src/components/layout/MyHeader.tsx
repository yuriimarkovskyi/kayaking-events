import { LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Select } from 'antd';
import MyMenu from 'components/MyMenu';
import { app } from 'config/firebase';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  isAuthorized?: boolean;
}

function MyHeader({ isAuthorized = false }: Props) {
  const { Header } = Layout;
  const { Option } = Select;

  const auth = getAuth(app);

  const [language, setLanguage] = useState('ua');

  const handleChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <Header className="header">
      <Container className="header__content">
        <div className="header__left-side">
          <Link to="/categories" className="header__logo">
            <img
              src="https://img.icons8.com/external-filled-outline-icons-maxicons/50/000000/external-activity-season-filled-outline-icons-maxicons.png"
              alt="logo"
            />
          </Link>
          <MyMenu />
        </div>
        <div className="header__right-side">
          {
            isAuthorized
              ? (
                <Button
                  htmlType="button"
                  type="primary"
                  icon={<LogoutOutlined />}
                  onClick={() => signOut(auth)}
                >
                  Вийти
                </Button>
              )
              : (
                <Select
                  placeholder={language.toUpperCase()}
                  onChange={handleChange}
                >
                  <Option value="ua">
                    UA
                  </Option>
                  <Option value="en">
                    EN
                  </Option>
                </Select>
              )
          }
        </div>
      </Container>
    </Header>
  );
}

export default MyHeader;

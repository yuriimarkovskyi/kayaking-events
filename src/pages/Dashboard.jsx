import React from 'react';
import { Button, Layout, Tabs } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import { EditOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Registrations from '../components/Registrations';
import AuthorizationForm from '../components/AuthorizationForm';
import { app } from '../firebase/firebase';

function Dashboard() {
  const { TabPane } = Tabs;
  const { Header, Content } = Layout;

  const auth = getAuth(app);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  return (
    user
      ? (
        <Container fluid>
          <Header className="header">
            <Button
              htmlType="button"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={logout}
            >
              Вийти
            </Button>
          </Header>
          <Content>
            <Tabs centered size="large">
              <TabPane
                tab={(
                  <span>
                    <UnorderedListOutlined />
                    Реєстрації
                  </span>
                 )}
                key="1"
              >
                <Registrations />
              </TabPane>
              <TabPane
                tab={(
                  <span>
                    <EditOutlined />
                    Івенти
                  </span>
                  )}
                key="2"
              >
                Events
              </TabPane>
            </Tabs>
          </Content>
        </Container>
      )
      : (
        <Container>
          <Content className="dashboard__content_form">
            <Row>
              <Col className="mx-auto" sm={10} md={6} lg={4}>
                <AuthorizationForm signIn={signInWithEmailAndPassword} />
              </Col>
            </Row>
          </Content>
        </Container>
      )
  );
}

export default Dashboard;

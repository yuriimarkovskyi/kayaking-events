import React from 'react';
import { Button, Layout, Tabs } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import { LogoutOutlined } from '@ant-design/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Registrations from '../../components/Dashboard/Registrations';
import AuthorizationForm from '../../components/Dashboard/AuthorizationForm';
import { firebaseApp } from '../../firebase/firebase';
import Loader from '../../components/Loader';
import Instructors from '../../components/Dashboard/Instructors';

function Dashboard() {
  const { TabPane } = Tabs;
  const { Header, Content } = Layout;

  const auth = getAuth(firebaseApp);
  const [isUser, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    !isUser
      ? (
        <Container>
          <Content className="dashboard__content_form">
            <Row>
              <Col className="mx-auto" sm={10} md={6} lg={4}>
                <AuthorizationForm />
              </Col>
            </Row>
          </Content>
        </Container>
      )
      : (
        <Container fluid>
          <Header className="header">
            <Button
              htmlType="button"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => signOut(auth)}
            >
              Вийти
            </Button>
          </Header>
          <Content>
            <Tabs centered size="large">
              <TabPane tab="Реєстрації" key="1">
                <Registrations />
              </TabPane>
              <TabPane tab="Інструктори" key="2">
                <Instructors />
              </TabPane>
            </Tabs>
          </Content>
        </Container>
      )
  );
}

export default Dashboard;

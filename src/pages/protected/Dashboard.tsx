import React from 'react';
import { Button, Layout, Tabs } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import { LogoutOutlined } from '@ant-design/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import RegistrationsTable from 'components/Dashboard/RegistrationsTable';
import { firebaseApp } from 'firebaseConfig';
import AuthorizationForm from 'components/Dashboard/AuthorizationForm';
import Loader from 'components/Loader';
import InstructorsTable from 'components/Dashboard/InstructorsTable';
import EventsTable from 'components/Dashboard/EventsTable';
import RentalStationsTable from 'components/Dashboard/RentalStationsTable';
import PricesTable from 'components/Dashboard/PricesTable';

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
                <RegistrationsTable />
              </TabPane>
              <TabPane tab="Івенти" key="2">
                <EventsTable />
              </TabPane>
              <TabPane tab="Інструктори" key="3">
                <InstructorsTable />
              </TabPane>
              <TabPane tab="Дати" key="4">
                Дати
              </TabPane>
              <TabPane tab="Ціни" key="5">
                <PricesTable />
              </TabPane>
              <TabPane tab="Прокати" key="6">
                <RentalStationsTable />
              </TabPane>
            </Tabs>
          </Content>
        </Container>
      )
  );
}

export default Dashboard;

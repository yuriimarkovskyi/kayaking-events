import { LogoutOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import AuthorizationForm from 'components/Forms/AuthorizationForm';
import Loader from 'components/Loader';
import DatesTable from 'components/Tables/DatesTable';
import EventsTable from 'components/Tables/EventsTable';
import InstructorsTable from 'components/Tables/InstructorsTable';
import PricesBoatsTable from 'components/Tables/PricesBoatsTable';
import RegistrationsTable from 'components/Tables/RegistrationsTable';
import RentalStationsTable from 'components/Tables/RentalStationsTable';
import { app } from 'config/firebase';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';

function Dashboard() {
  const { TabPane } = Tabs;

  const auth = getAuth(app);
  const [isUser, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    !isUser
      ? (
        <Container>
          <Row className="dashboard__content_form">
            <Col className="mx-auto" sm={10} md={6} lg={4}>
              <AuthorizationForm />
            </Col>
          </Row>
        </Container>
      )
      : (
        <Container fluid>
          <header className="header">
            <Button
              htmlType="button"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => signOut(auth)}
            >
              Вийти
            </Button>
          </header>
          <Tabs centered size="large">
            <TabPane tab="Реєстрації" key="1">
              <RegistrationsTable />
            </TabPane>
            <TabPane tab="Події" key="2">
              <EventsTable />
            </TabPane>
            <TabPane tab="Інструктори" key="3">
              <InstructorsTable />
            </TabPane>
            <TabPane tab="Дати" key="4">
              <DatesTable />
            </TabPane>
            <TabPane tab="Ціни" key="5">
              <PricesBoatsTable />
            </TabPane>
            <TabPane tab="Прокати" key="6">
              <RentalStationsTable />
            </TabPane>
          </Tabs>
        </Container>
      )
  );
}

export default Dashboard;

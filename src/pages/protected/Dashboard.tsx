import React from 'react';
import { Button, Tabs } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import { LogoutOutlined } from '@ant-design/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import RegistrationsTable from 'components/Tables/RegistrationsTable';
import { app } from 'config/firebase';
import AuthorizationForm from 'components/Forms/AuthorizationForm';
import Loader from 'components/Loader';
import InstructorsTable from 'components/Tables/InstructorsTable';
import EventsTable from 'components/Tables/EventsTable';
import RentalStationsTable from 'components/Tables/RentalStationsTable';
import PricesTable from 'components/Tables/PricesTable';
import DatesTable from 'components/Tables/DatesTable';

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
            <TabPane tab="Івенти" key="2">
              <EventsTable />
            </TabPane>
            <TabPane tab="Інструктори" key="3">
              <InstructorsTable />
            </TabPane>
            <TabPane tab="Дати" key="4">
              <DatesTable />
            </TabPane>
            <TabPane tab="Ціни" key="5">
              <PricesTable />
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

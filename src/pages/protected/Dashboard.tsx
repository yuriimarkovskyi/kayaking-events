import { LogoutOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import AuthorizationForm from 'components/Forms/AuthorizationForm';
import Loader from 'components/Loader';
import PricesEquipmentTable from 'components/Tables/PricesEquipmentTable';
import MyContent from 'components/UI/MyContent';
import { app } from 'config/firebase';
import { getAuth, signOut } from 'firebase/auth';
import React, { lazy, Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';

const CategoriesTable = lazy(() => import ('components/Tables/CategoriesTable'));
const DatesTable = lazy(() => import ('components/Tables/DatesTable'));
const EventsTable = lazy(() => import ('components/Tables/EventsTable'));
const InstructorsTable = lazy(() => import ('components/Tables/InstructorsTable'));
const PricesBoatsTable = lazy(() => import ('components/Tables/PricesBoatsTable'));
const RegistrationsTable = lazy(() => import ('components/Tables/RegistrationsTable'));
const RentalStationsTable = lazy(() => import ('components/Tables/RentalStationsTable'));

function Dashboard() {
  const auth = getAuth(app);
  const [isUser, loading] = useAuthState(auth);

  const { TabPane } = Tabs;

  if (loading) return <Loader />;

  return (
    !isUser
      ? (
        <Container>
          <MyContent centered>
            <Row>
              <Col className="mx-auto" sm={10} md={6} lg={4}>
                <AuthorizationForm />
              </Col>
            </Row>
          </MyContent>
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
          <Suspense fallback={<Loader />}>
            <Tabs centered size="large">
              <TabPane tab="Реєстрації" key="1">
                <RegistrationsTable />
              </TabPane>
              <TabPane tab="Категорії" key="2">
                <CategoriesTable />
              </TabPane>
              <TabPane tab="Події" key="3">
                <EventsTable />
              </TabPane>
              <TabPane tab="Інструктори" key="4">
                <InstructorsTable />
              </TabPane>
              <TabPane tab="Дати" key="5">
                <DatesTable />
              </TabPane>
              <TabPane tab="Ціни" key="6">
                <PricesBoatsTable />
                <PricesEquipmentTable />
              </TabPane>
              <TabPane tab="Прокати" key="7">
                <RentalStationsTable />
              </TabPane>
            </Tabs>
          </Suspense>
        </Container>
      )
  );
}

export default Dashboard;

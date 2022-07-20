import { Tabs } from 'antd';
import MyLayout from 'components/layout/MyLayout';
import Loader from 'components/Loader';
import { app } from 'config/firebase';
import { getAuth } from 'firebase/auth';
import AuthorizationForm from 'pages/Dashboard/components/Forms/AuthorizationForm';
import PricesEquipmentTable from 'pages/Dashboard/components/Tables/PricesEquipmentTable';
import React, { lazy, Suspense } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';

const CategoriesTable = lazy(() => import ('pages/Dashboard/components/Tables/CategoriesTable'));
const DatesTable = lazy(() => import ('pages/Dashboard/components/Tables/DatesTable'));
const EventsTable = lazy(() => import ('pages/Dashboard/components/Tables/EventsTable'));
const InstructorsTable = lazy(() => import ('pages/Dashboard/components/Tables/InstructorsTable'));
const PricesBoatsTable = lazy(() => import ('pages/Dashboard/components/Tables/PricesBoatsTable'));
const RegistrationsTable = lazy(() => import ('pages/Dashboard/components/Tables/RegistrationsTable'));
const RentalStationsTable = lazy(() => import ('pages/Dashboard/components/Tables/RentalStationsTable'));

function Dashboard() {
  const auth = getAuth(app);
  const [isUser, loading] = useAuthState(auth);

  const { TabPane } = Tabs;

  if (loading) return <Loader />;

  return (
    !isUser
      ? (
        <MyLayout centeredContent contentOnly>
          <Row>
            <Col className="mx-auto" sm={10} md={6} lg={4}>
              <AuthorizationForm />
            </Col>
          </Row>
        </MyLayout>
      )
      : (
        <MyLayout fluidContent isAuthorized>
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
        </MyLayout>
      )
  );
}

export default Dashboard;

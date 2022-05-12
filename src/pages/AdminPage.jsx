import React from 'react';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import Title from '../components/UI/Title';
import 'react-tabs/style/react-tabs.scss';
import AdminRegistrations from '../components/AdminRegistrations';

function AdminPage() {
  return (
    <Tabs>
      <TabList>
        <Tab>
          Реєстрації
        </Tab>
        <Tab>
          Івенти
        </Tab>
      </TabList>
      <TabPanel>
        <AdminRegistrations />
      </TabPanel>
      <TabPanel>
        <Title>
          Інформація щодо івентів
        </Title>
      </TabPanel>
    </Tabs>
  );
}

export default AdminPage;

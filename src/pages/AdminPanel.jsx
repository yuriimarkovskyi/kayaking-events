import React from 'react';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import RegistrationInformation from '../components/RegistrationInformation';
import Title from '../components/UI/Title';
import 'react-tabs/style/react-tabs.scss';
import { uniqObjectsByKey } from '../helpers/uniqObjectsByKey';

function AdminPanel() {
  const storedMembers = JSON.parse(localStorage.getItem('events-list'));
  const membersUniqEvent = uniqObjectsByKey(storedMembers, 'event', 'generalData');

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
        <Title>
          Інформація щодо реєстрацій
        </Title>
        {membersUniqEvent.map((member, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RegistrationInformation key={index} member={member} />
        ))}
      </TabPanel>
      <TabPanel>
        <Title>
          Інформація щодо івентів
        </Title>
      </TabPanel>
    </Tabs>
  );
}

export default AdminPanel;

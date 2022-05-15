import React from 'react';
import { Tabs } from 'antd';
import { Container } from 'react-bootstrap';
import { UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import AdminRegistrations from '../components/AdminRegistrations';

function AdminPage() {
  const { TabPane } = Tabs;

  return (
    <Container fluid>
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
          <AdminRegistrations />
        </TabPane>
        <TabPane
          tab={(
            <span>
              <EditOutlined />
              Івенти
            </span>
        )}
          key="2"
        />
      </Tabs>
    </Container>
  );
}

export default AdminPage;

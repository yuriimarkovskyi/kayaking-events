import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
// eslint-disable-next-line camelcase
import uk_UA from 'antd/lib/locale/uk_UA';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
  // eslint-disable-next-line camelcase
    <ConfigProvider locale={uk_UA}>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

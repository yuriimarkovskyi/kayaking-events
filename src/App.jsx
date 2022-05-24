import React from 'react';
import { ConfigProvider } from 'antd';
// eslint-disable-next-line camelcase
import uk_UA from 'antd/lib/locale/uk_UA';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
  // eslint-disable-next-line camelcase
    <ConfigProvider locale={uk_UA}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;

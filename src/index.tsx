import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import uk_UA from 'antd/lib/locale/uk_UA';
import { ConfigProvider } from 'antd';
import App from './App';
import 'styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ConfigProvider locale={uk_UA}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
);

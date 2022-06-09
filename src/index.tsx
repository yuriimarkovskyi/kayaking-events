import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line camelcase
import uk_UA from 'antd/lib/locale/uk_UA';
import { ConfigProvider } from 'antd';
import store from './store/store';
import App from './App';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    {/* eslint-disable-next-line camelcase */}
    <ConfigProvider locale={uk_UA}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
);

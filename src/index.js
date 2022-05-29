import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line camelcase
import uk_UA from 'antd/lib/locale/uk_UA';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import App from './App';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* eslint-disable-next-line camelcase */}
      <ConfigProvider locale={uk_UA}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
);

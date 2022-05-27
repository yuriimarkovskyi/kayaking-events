import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line camelcase
import uk_UA from 'antd/lib/locale/uk_UA';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import App from './App';
import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* eslint-disable-next-line camelcase */}
        <ConfigProvider locale={uk_UA}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

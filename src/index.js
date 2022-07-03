import './bootstrap';

import {ConfigProvider} from 'antd';
import {RootProvider} from 'context';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';

/** Components */
import App from './App';

function noop() {}

if (process.env.NODE_ENV !== 'development') {
  console.log('is production!');
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

const store = configureStore();

ConfigProvider.config({
  theme: {
    primaryColor: '#545cd8'
  }
});

ReactDOM.render(
  <Provider store={store}>
    <RootProvider>
      <App />
    </RootProvider>
  </Provider>,
  document.getElementById('root')
);

import './bootstrap';

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

ReactDOM.render(
  <Provider store={store}>
    <RootProvider>
      <App />
    </RootProvider>
  </Provider>,
  document.getElementById('root')
);

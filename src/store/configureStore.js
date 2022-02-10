import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {isDev, isProd} from 'utils/helpers/environments.helpers';

import reducers from './reducers';

const middleware = [];

if (isDev) {
  const {createLogger} = require('redux-logger');
  const logger = createLogger({
    // ...options
    collapsed: true
  });
  middleware.push(logger);
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  !isProd
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    enhancer
  );
}

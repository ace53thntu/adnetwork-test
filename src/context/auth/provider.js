/**
 * Authentication context and provider
 */
import React from 'react';

import {authInitialState, authReducer} from './reducer';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
AuthStateContext.displayName = 'AuthStateContext';
AuthDispatchContext.displayName = 'AuthDispatchContext';

function AuthProvider({children}) {
  const [state, dispatch] = React.useReducer(authReducer, authInitialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export {AuthProvider, AuthStateContext, AuthDispatchContext};

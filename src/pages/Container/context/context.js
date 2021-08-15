/**
 * Container context and provider
 */
import React from 'react';

import {containerReducer, containerInitialState} from './reducer';

const ContainerStateContext = React.createContext();
const ContainerDispatchContext = React.createContext();
ContainerStateContext.displayName = 'ContainerStateContext';
ContainerDispatchContext.displayName = 'ContainerDispatchContext';

function ContainerProvider({children}) {
  const [state, dispatch] = React.useReducer(
    containerReducer,
    containerInitialState,
  );

  return (
    <ContainerStateContext.Provider value={state}>
      <ContainerDispatchContext.Provider value={dispatch}>
        {children}
      </ContainerDispatchContext.Provider>
    </ContainerStateContext.Provider>
  );
}

export {ContainerProvider, ContainerStateContext, ContainerDispatchContext};

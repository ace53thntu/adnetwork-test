import React, {useState} from 'react';

const CappingContext = React.createContext([{}, () => {}]);

const CappingProvider = props => {
  const [state, setState] = useState({
    currentObject: null,
    currentObjectType: 'capping',
    typeText: 'Capping',
    titleDialog: 'Are you sure to delete this capping',
    showFormCapping: false,
    showFormWeekPart: false
  });

  return (
    <CappingContext.Provider value={[state, setState]}>
      {props.children}
    </CappingContext.Provider>
  );
};

export {CappingContext, CappingProvider};

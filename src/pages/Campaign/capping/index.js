//---> Build-in component
import React from 'react';

//---> Internal Component
import {CappingProvider} from './CappingContext';
import CappingList from './CappingList';

const CappingManagement = () => {
  return (
    <CappingProvider>
      <CappingList />
    </CappingProvider>
  );
};

export default CappingManagement;

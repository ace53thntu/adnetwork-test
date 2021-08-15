import React from 'react';
import {useLocation} from 'react-router-dom';
import {StrategyFormDetailEdit} from './DetailStrategyForm';

const AddStrategy = props => {
  const {state} = useLocation();

  return <StrategyFormDetailEdit campaignId={state} isEdit={false} />;
};
export default AddStrategy;

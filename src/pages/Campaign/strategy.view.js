import {useGetStrategy} from 'core/queries/campaigns';
import React from 'react';
import {useParams} from 'react-router';
import {StrategyFormDetailView} from './DetailStrategyForm';

const ViewStrategy = () => {
  const {id: stgId} = useParams();
  const {data, isLoading} = useGetStrategy(stgId);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <StrategyFormDetailView
      viewOnly={true}
      isEdit={true}
      currentStrategy={data}
    />
  );
};
export default ViewStrategy;

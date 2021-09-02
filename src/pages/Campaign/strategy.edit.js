import React from 'react';
import {useParams} from 'react-router';
import {StrategyFormDetailEdit} from './components/DetailStrategyForm';
import {useGetStrategy} from 'queries/strategy';

const EditStrategy = () => {
  const {id: stgId} = useParams();
  const {data, isLoading} = useGetStrategy(stgId);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <StrategyFormDetailEdit isEdit={true} currentStrategy={data || {}} />
  );
};
export default EditStrategy;

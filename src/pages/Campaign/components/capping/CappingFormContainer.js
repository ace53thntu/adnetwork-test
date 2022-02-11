import {useGetCapping} from 'queries/capping';
import React from 'react';
import CappingForm from './CappingForm';

const CappingFormContainer = ({cappingId, onSubmit = () => null}) => {
  const {data: capping, isLoading} = useGetCapping(cappingId);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CappingForm capping={capping} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default CappingFormContainer;

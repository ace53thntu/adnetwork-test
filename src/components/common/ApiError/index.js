import React from 'react';
import {DebugMessage} from './api-error.styled';

const ApiError = ({apiError}) => {
  if (!apiError) {
    return 'Somethings went wrong!';
  }

  if (apiError && !apiError.msg) {
    return apiError;
  }

  if (apiError?.msg && !apiError?.debug) {
    return apiError?.msg;
  }

  return (
    <div>
      <strong>{apiError?.msg}</strong>
      <DebugMessage>{apiError?.debug}</DebugMessage>
    </div>
  );
};

export default React.memo(ApiError);

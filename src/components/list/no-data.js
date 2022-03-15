import React from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string
};

const NoDataAvailable = ({message = 'No data available'}) => {
  return (
    <div className="text-muted text-center font-weight-bold">{message}</div>
  );
};

NoDataAvailable.propTypes = propTypes;

export default NoDataAvailable;

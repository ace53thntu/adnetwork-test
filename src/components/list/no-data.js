import React from 'react';

import PropTypes from 'prop-types';
import {NoDataStyle} from './styled';

const propTypes = {
  message: PropTypes.string
};

const NoDataAvailable = ({message = 'No data available'}) => {
  return (
    <NoDataStyle className="text-muted text-center font-weight-bold">
      {message}
    </NoDataStyle>
  );
};

NoDataAvailable.propTypes = propTypes;

export default NoDataAvailable;

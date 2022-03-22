//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Styles
import {NoReportStyled} from './styled';

const propTypes = {
  message: PropTypes.string
};

function NoReportAvailable({message = 'No report'}) {
  return <NoReportStyled>{message}</NoReportStyled>;
}

NoReportAvailable.propTypes = propTypes;

export default React.memo(NoReportAvailable);

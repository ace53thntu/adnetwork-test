import React from 'react';

import {Col} from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

const DetailItem = ({label, value}) => {
  return (
    <Col md={4} className="mb-3">
      <div className="text-capitalize font-weight-bold">
        {label?.replace('_', ' ')}
      </div>
      <div className="mt-2">{value}</div>
    </Col>
  );
};

DetailItem.propTypes = propTypes;

export default React.memo(DetailItem);

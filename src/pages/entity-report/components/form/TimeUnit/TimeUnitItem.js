import React from 'react';

import PropTypes from 'prop-types';

import {UnitButton} from '../styled';

const propTypes = {
  onClickTimeRange: PropTypes.func,
  active: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string
};

const TimeUnitItem = ({
  onClickTimeRange = () => null,
  active = false,
  readOnly = false,
  label = ''
}) => {
  return (
    <UnitButton
      style={{fontSize: '12px', textTransform: 'capitalize'}}
      onClick={onClickTimeRange}
      color="warning"
      outline
      active={active}
      readOnly={readOnly}
      size="small"
    >
      {label}
    </UnitButton>
  );
};

TimeUnitItem.propTypes = propTypes;

export default TimeUnitItem;

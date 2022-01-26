import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import classNames from 'clsx';

import useStyles from './styles';
import {Badge} from 'reactstrap';

function Status(props) {
  const {color, label, noHeader} = props;
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={label}
      className={classNames(
        classes.chip,
        classes[color],
        noHeader && classes.noHeader
      )}
    />
  );
}

export function CustomStatus(props) {
  const {color, label} = props;

  return (
    <Badge size="small" color={color} pill>
      {label}
    </Badge>
  );
}

Status.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'success',
    'error',
    'info',
    'warning',
    'default',
    'delete',
    'secondary',
    'draft'
  ]),
  noHeader: PropTypes.bool
};

Status.defaultProps = {
  color: 'default',
  noHeader: false
};

export default Status;

import MuiListItem from '@material-ui/core/ListItem';
import classNames from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import {useListStyles} from './styles';

function ListItem(props) {
  const {children, handleClick, status, isBid = false, isDeal = false} = props;

  const classes = useListStyles();

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return classes.success;
      case 'error':
      case 'inactive':
        return classes.error;
      case 'pending':
        return classes.warning;
      case 'completed':
        return classes.info;
      default:
        return classes.default;
    }
  };

  return (
    <MuiListItem
      button
      disableRipple
      className={classNames(
        classes.listItemRoot,
        status ? getStatusColor(status) : '',
        isBid ? 'has-bid' : '',
        isDeal ? 'has-deal' : ''
      )}
      onClick={handleClick}
    >
      {children}
    </MuiListItem>
  );
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
  status: PropTypes.oneOf([
    'active by default',
    'active',
    'error',
    'pending',
    'completed',
    'inactive'
  ]),
  isBid: PropTypes.bool,
  isDeal: PropTypes.bool
};

ListItem.defaultProps = {
  handleClick: () => {},
  status: 'active'
};

export default ListItem;

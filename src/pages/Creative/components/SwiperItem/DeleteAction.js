import PropTypes from 'prop-types';
import * as React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';

import {DeleteActionWrapper, DeleteIconButton} from './SwiperItem.styles';

function DeleteAction(props) {
  const {onDelete} = props;

  return (
    <DeleteActionWrapper>
      <DeleteIconButton onClick={onDelete}>
        <DeleteIcon className="text-danger" fontSize="small" />
      </DeleteIconButton>
    </DeleteActionWrapper>
  );
}

DeleteAction.propTypes = {
  onAgree: PropTypes.func
};
DeleteAction.defaultProps = {
  onAgree: () => {}
};

export default DeleteAction;

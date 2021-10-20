import PropTypes from 'prop-types';
import * as React from 'react';
import {Button, Modal} from 'reactstrap';

import {Body, Header} from './StrapConfirmModal.styles';

function StrapConfirmModal(props) {
  const {isOpen, toggle, title, onOk} = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Header>{title}</Header>
      <Body>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={onOk} className="ml-2">
          OK
        </Button>
      </Body>
    </Modal>
  );
}

StrapConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onOk: PropTypes.func,
  title: PropTypes.string
};
StrapConfirmModal.defaultProps = {
  isOpen: false,
  toggle: () => {},
  onOk: () => {},
  title: 'Are you sure?'
};

export default StrapConfirmModal;

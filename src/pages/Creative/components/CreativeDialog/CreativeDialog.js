import PropTypes from 'prop-types';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Card, CardBody, Modal, ModalHeader} from 'reactstrap';
import {
  toggleCreateCreativeDialog,
  useCreativeSelector
} from 'store/reducers/creative';

import {TABS} from '../CreativeCreate/constants';

function CreativeDialog(props) {
  const {children} = props;

  const dispatch = useDispatch();

  const {isToggleCreateCreativeDialog} = useCreativeSelector();

  const handleCloseModal = () => {
    dispatch(toggleCreateCreativeDialog(TABS.banner));
  };

  return (
    <Modal
      backdrop
      unmountOnClose
      isOpen={isToggleCreateCreativeDialog}
      // toggle={handleCloseModal}
      className="modal-dialog-centered shadow-none modal-size-1200"
      // onClosed={handleClosedModal}
    >
      <ModalHeader toggle={handleCloseModal}>Create Creatives</ModalHeader>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </Modal>
  );
}

CreativeDialog.propTypes = {
  children: PropTypes.node
};
CreativeDialog.defaultProps = {};

export default CreativeDialog;

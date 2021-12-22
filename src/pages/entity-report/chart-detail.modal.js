import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default function ModalChartDetail({
  modal,
  toggle,
  children,
  title = 'Report details'
}) {
  return (
    <Modal isOpen={modal} toggle={toggle} style={{maxWidth: '1020px'}}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="link" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

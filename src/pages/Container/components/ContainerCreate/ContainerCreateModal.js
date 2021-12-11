// import PropTypes from 'prop-types';
import * as React from 'react';
import {Modal} from 'reactstrap';
import {useContainerSelector} from 'store/reducers/container';

import ContainerCreate from './ContainerCreate';

function ContainerCreateModal(props) {
  const {toggleCreateContainerModal: isOpen} = useContainerSelector();

  return (
    <Modal unmountOnClose isOpen={isOpen}>
      <ContainerCreate />
    </Modal>
  );
}

ContainerCreateModal.propTypes = {};
ContainerCreateModal.defaultProps = {};

export default ContainerCreateModal;

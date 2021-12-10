// import PropTypes from 'prop-types';
import * as React from 'react';
import {Modal} from 'reactstrap';
import {useContainerSelector} from 'store/reducers/container';

import ContainerCreate from './ContainerCreate';

function ContainerCreateModal(props) {
  console.log('runing ');
  const {toggleCreateContainerModal: isOpen} = useContainerSelector();
  console.log(
    '🚀 ~ file: ContainerCreateModal.js ~ line 10 ~ ContainerCreateModal ~ isOpen',
    isOpen
  );

  return (
    <Modal unmountOnClose isOpen={isOpen}>
      <ContainerCreate />
    </Modal>
  );
}

ContainerCreateModal.propTypes = {};
ContainerCreateModal.defaultProps = {};

export default ContainerCreateModal;

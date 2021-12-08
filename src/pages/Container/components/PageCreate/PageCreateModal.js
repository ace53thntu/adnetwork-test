import {useContainerSelector} from 'store/reducers/container';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {Modal} from 'reactstrap';

import PageCreate from './PageCreate';

function PageCreateModal(props) {
  const {toggleCreatePageModal} = useContainerSelector();

  return (
    <Modal unmountOnClose isOpen={toggleCreatePageModal}>
      <PageCreate />
    </Modal>
  );
}

PageCreateModal.propTypes = {};
PageCreateModal.defaultProps = {};

export default PageCreateModal;

import * as React from 'react';

import {ModalHeader} from 'reactstrap';

import {ContainerCreateLoading} from './ContainerCreate.styles';
import ContainerCreateForm from './ContainerCreateForm';
import {BlockOverlay} from 'components/common';
import {useContainerSelector} from 'store/reducers/container';

function ContainerCreate(props) {
  const {containers, isLoading} = useContainerSelector();

  return (
    <>
      <ModalHeader>Create container</ModalHeader>

      {isLoading ? (
        <ContainerCreateLoading>
          <BlockOverlay />
        </ContainerCreateLoading>
      ) : (
        <ContainerCreateForm containers={containers} />
      )}
    </>
  );
}

ContainerCreate.propTypes = {};
ContainerCreate.defaultProps = {};

export default ContainerCreate;

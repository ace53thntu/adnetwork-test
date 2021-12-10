import * as React from 'react';

import {ModalHeader} from 'reactstrap';

import {useGetContainers} from 'queries/container';
import {ContainerCreateLoading} from './ContainerCreate.styles';
import ContainerCreateForm from './ContainerCreateForm';
import {BlockOverlay} from 'components/common';

function ContainerCreate(props) {
  const {data: {items: containers = []} = {}, isFetching} = useGetContainers();

  return (
    <>
      <ModalHeader>Create container</ModalHeader>

      {isFetching ? (
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

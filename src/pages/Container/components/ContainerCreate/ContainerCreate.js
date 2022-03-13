import * as React from 'react';

import {ModalHeader} from 'reactstrap';

import {ContainerCreateLoading} from './ContainerCreate.styles';
import ContainerCreateForm from './ContainerCreateForm';
import {BlockOverlay} from 'components/common';
import {useContainerSelector} from 'store/reducers/container';
import {getRole, getUser} from 'utils/helpers/auth.helpers';
import {useGetPublisher} from 'queries/publisher';
import {USER_ROLE} from 'pages/user-management/constants';

function ContainerCreate(props) {
  const {containers, isLoading} = useContainerSelector();
  const role = getRole();
  const user = getUser();
  const {data: publisher} = useGetPublisher(
    user.reference_uuid,
    !!user.reference_uuid && role === USER_ROLE.PUBLISHER
  );
  return (
    <>
      <ModalHeader>Create container</ModalHeader>

      {isLoading ? (
        <ContainerCreateLoading>
          <BlockOverlay />
        </ContainerCreateLoading>
      ) : role === USER_ROLE.PUBLISHER ? (
        publisher && (
          <ContainerCreateForm containers={containers} publisher={publisher} />
        )
      ) : (
        <ContainerCreateForm containers={containers} />
      )}
    </>
  );
}

ContainerCreate.propTypes = {};
ContainerCreate.defaultProps = {};

export default ContainerCreate;

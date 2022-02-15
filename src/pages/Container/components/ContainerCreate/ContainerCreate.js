import * as React from 'react';

import {ModalHeader} from 'reactstrap';

import {useGetContainers} from 'queries/container';
import {ContainerCreateLoading} from './ContainerCreate.styles';
import ContainerCreateForm from './ContainerCreateForm';
import {BlockOverlay} from 'components/common';
import {getRole, getUser} from 'utils/helpers/auth.helpers';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {USER_ROLE} from 'pages/user-management/constants';

function ContainerCreate(props) {
  const role = getRole();
  const user = getUser();
  const params = {per_page: 1000, page: DEFAULT_PAGINATION.page};
  if (role === USER_ROLE.PUBLISHER) {
    params.publisher_uuid = user?.uuid;
  }
  const {data: {items: containers = []} = {}, isFetching} = useGetContainers({
    params,
    enabled: true
  });

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

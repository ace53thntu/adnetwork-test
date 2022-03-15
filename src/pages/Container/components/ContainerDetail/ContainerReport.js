import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router-dom';

const ContainerReport = () => {
  const {cid: containerId} = useParams();
  console.log(
    '🚀 ~ file: ContainerReport.js ~ line 13 ~ ContainerReport ~ containerId',
    containerId
  );

  return (
    <EntityReport
      entity={EntityTypes.CONTAINER}
      entityId={containerId}
      ownerId={containerId}
      ownerRole={USER_ROLE.PUBLISHER}
    />
  );
};

export default ContainerReport;

import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router-dom';

import PublisherLayout from './publisher-layout';

const PublisherReport = () => {
  const {publisherId} = useParams();

  return (
    <PublisherLayout pageTitle="Publisher Reports">
      <EntityReport
        entity={EntityTypes.PUBLISHER}
        entityId={publisherId}
        ownerId={publisherId}
        ownerRole={USER_ROLE.PUBLISHER}
      />
    </PublisherLayout>
  );
};

export default PublisherReport;

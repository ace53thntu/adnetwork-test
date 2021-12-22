//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import EntityReport from 'pages/entity-report';
import PublisherLayout from './publisher-layout';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';

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

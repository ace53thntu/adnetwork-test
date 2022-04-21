import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
import {useGetPublisher} from 'queries/publisher';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router-dom';

import PublisherLayout from './publisher-layout';

const PublisherReport = () => {
  const {publisherId} = useParams();
  const {data, isFetching} = useGetPublisher(publisherId, !!publisherId);

  return (
    <PublisherLayout pageTitle="Publisher Reports">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <EntityReport
          entity={EntityTypes.PUBLISHER}
          entityName={data?.name}
          entityId={publisherId}
          ownerId={publisherId}
          ownerRole={USER_ROLE.PUBLISHER}
        />
      )}
    </PublisherLayout>
  );
};

export default PublisherReport;

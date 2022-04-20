import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
import {useGetAdvertiser} from 'queries/advertiser';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router-dom';

import AdvertiserLayout from './advertiser-layout';

const AdvertiserReport = () => {
  const {advertiserId} = useParams();
  const {data, isFetching} = useGetAdvertiser(advertiserId, !!advertiserId);

  return (
    <AdvertiserLayout pageTitle="Advertiser Reports">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <EntityReport
          entity={EntityTypes.ADVERTISER}
          entityId={advertiserId}
          ownerId={advertiserId}
          ownerRole={USER_ROLE.ADVERTISER}
          entityName={data?.name}
        />
      )}
    </AdvertiserLayout>
  );
};

export default React.memo(AdvertiserReport);

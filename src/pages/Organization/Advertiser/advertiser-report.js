import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router-dom';

import AdvertiserLayout from './advertiser-layout';

const AdvertiserReport = () => {
  const {advertiserId} = useParams();

  return (
    <AdvertiserLayout pageTitle="Advertiser Reports">
      <EntityReport
        entity={EntityTypes.ADVERTISER}
        entityId={advertiserId}
        ownerId={advertiserId}
        ownerRole={USER_ROLE.ADVERTISER}
      />
    </AdvertiserLayout>
  );
};

export default React.memo(AdvertiserReport);

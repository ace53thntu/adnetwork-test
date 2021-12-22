//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import EntityReport from 'pages/entity-report';
import AdvertiserLayout from './advertiser-layout';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';

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

import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
//---> External Modules
import {useParams} from 'react-router-dom';

import InventoryLayout from './layout';

const InventoryReport = () => {
  const {t} = useTranslation();
  const {inventoryId} = useParams();

  return (
    <InventoryLayout pageTitle={t('inventoryReports')}>
      <EntityReport
        entity={EntityTypes.INVENTORY}
        entityId={inventoryId}
        ownerId={inventoryId}
        ownerRole={USER_ROLE.PUBLISHER}
      />
    </InventoryLayout>
  );
};

export default React.memo(InventoryReport);

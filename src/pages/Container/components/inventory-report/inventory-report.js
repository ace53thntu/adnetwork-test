//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import EntityReport from 'pages/entity-report';
import InventoryLayout from './layout';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import {useTranslation} from 'react-i18next';

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

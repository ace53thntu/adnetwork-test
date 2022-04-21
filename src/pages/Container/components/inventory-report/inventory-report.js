//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import InventoryLayout from './layout';
import {EntityTypes} from 'constants/report';
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
import {useGetInventory} from 'queries/inventory';

const InventoryReport = () => {
  const {t} = useTranslation();
  const {inventoryId} = useParams();
  const {data, isFetching} = useGetInventory(inventoryId);

  return (
    <InventoryLayout pageTitle={t('inventoryReports')}>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <EntityReport
          entity={EntityTypes.INVENTORY}
          entityName={data?.name}
          entityId={inventoryId}
          ownerId={inventoryId}
          ownerRole={USER_ROLE.PUBLISHER}
        />
      )}
    </InventoryLayout>
  );
};

export default React.memo(InventoryReport);

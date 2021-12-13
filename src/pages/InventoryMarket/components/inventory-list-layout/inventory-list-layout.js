import React from 'react';
import {useTranslation} from 'react-i18next';
import {CardBody, CardHeader} from 'reactstrap';
import {useFilterParamsSelector} from 'store/reducers/inventory-market';
import {InventoryList} from '../inventory-list';
import {CardStyled} from './styled';

const InventoryListLayout = () => {
  const {t} = useTranslation();
  const filterParams = useFilterParamsSelector();

  return (
    <CardStyled>
      <CardHeader>{t('inventoryMarketList')}</CardHeader>
      <CardBody>
        <InventoryList filterParams={filterParams} />
      </CardBody>
    </CardStyled>
  );
};

export default React.memo(InventoryListLayout);

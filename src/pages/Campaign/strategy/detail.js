// Build-in Modules

import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import _ from 'lodash';

// Internal Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Strategy';
import {useGetStrategy} from 'queries/strategy';
import {
  initializedStrategyRedux,
  initStrategyInventoryListRedux,
  setStrategyInventoryListRedux,
  setStrategyInventoryTempListRedux,
  useSelectedIsInitializedInventorySelector,
  useStrategyInventorySelector
} from 'store/reducers/campaign';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';
import {CampaignContentLayout} from '../layout';
import {StrategyContainerStyled} from './styled';
import StrategyViewTabs from './ViewTabs';
import {QueryStatuses} from 'constants/react-query';

const StrategyDetail = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {strategyId, campaignId} = useParams();

  const {data: strategyData, isFetching, status} = useGetStrategy(strategyId);
  console.log("🚀 ~ file: detail.js ~ line 36 ~ StrategyDetail ~ status", status)
  const strategyInventoryRedux = useStrategyInventorySelector();
  const isInitializedInventory = useSelectedIsInitializedInventorySelector();

  const strategy = apiToForm({strategyData});

  React.useEffect(() => {
    if(isFetching){
      dispatch(initializedStrategyRedux(false));

    }
  }, [dispatch, isFetching])

  // Initializing inventory in strategy
  React.useEffect(() => {
    if (
      strategy &&
      status === QueryStatuses.SUCCESS &&
      !_.isEqual(strategyInventoryRedux, strategy?.inventories) &&
      !isInitializedInventory
    ) {
      const inventories =
        strategy?.inventories && strategy?.inventories.length > 0
          ? strategy?.inventories?.map((item, idx) => ({
              ...item,
              deal_floor_price: strategy?.inventories_bid[idx]?.price,
              noStore: false
            }))
          : [];
      dispatch(
        initStrategyInventoryListRedux({
          inventoryList: inventories,
          inventoryTempList: inventories
        })
      );
      dispatch(initializedStrategyRedux(true));
    }
  }, [
    dispatch,
    isInitializedInventory,
    status,
    strategy,
    strategy?.inventories,
    strategyInventoryRedux
  ]);

  useRedirectInCampaign();

  React.useEffect(() => {
    return () => {
      dispatch(setStrategyInventoryListRedux({inventoryList: []}));
      dispatch(setStrategyInventoryTempListRedux({inventoryList: []}));
      dispatch(initializedStrategyRedux(false));
    };
  }, [dispatch]);

  return (
    <CampaignContentLayout
      heading={t('strategyDetail')}
      subHeading={t('strategyPageDescription')}
    >
      <StrategyContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {!isFetching && (
          <Row>
            <Col md="12">
              <StrategyViewTabs
                currentStrategy={strategy}
                campaignId={campaignId}
              />
            </Col>
          </Row>
        )}
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default (StrategyDetail);

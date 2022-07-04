// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import _ from 'lodash';

// Internal Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Strategy';
import {useGetStrategy} from 'queries/strategy';
import {CampaignContentLayout} from '../layout';
import StrategyEditTabs from './EditTabs';
import {StrategyContainerStyled} from './styled';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';
import {
  initializedStrategyRedux,
  initStrategyInventoryListRedux,
  setStrategyInventoryListRedux,
  setStrategyInventoryTempListRedux,
  useSelectedIsInitializedInventorySelector,
  useStrategyInventorySelector
} from 'store/reducers/campaign';
import {useDispatch} from 'react-redux';
import {QueryStatuses} from 'constants/react-query';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

const StrategyEdit = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {strategyId} = useParams();

  const {data: strategyData, isFetching, isFetched, status} = useGetStrategy(
    strategyId
  );
  const strategyInventoryRedux = useStrategyInventorySelector();
  const isInitializedInventory = useSelectedIsInitializedInventorySelector();
  const strategy = apiToForm({strategyData});

  React.useEffect(() => {
    if (isFetching) {
      dispatch(initializedStrategyRedux(false));
    }
  }, [dispatch, isFetching]);

  useRedirectInCampaign();

  React.useEffect(() => {
    if (
      strategy &&
      status === QueryStatuses.SUCCESS &&
      !_.isEqual(strategyInventoryRedux, strategy?.inventories) &&
      !isInitializedInventory
    ) {
      const inventories =
        strategy?.inventories_bid && strategy?.inventories_bid.length > 0
          ? strategy?.inventories_bid?.map((item, idx) => {
              const foundInventory = strategy.inventories?.find(
                invItem => invItem?.uuid === item?.uuid
              );
              const {
                name,
                container_name,
                position_name,
                position_uuid,
                floor_price
              } = foundInventory || {};
              let {cpm, cpc, cpa, cpd, cpl, cpe, cpv, cpi, cpvm} = item || {};
              // Price model
              cpm = HandleCurrencyFields.convertApiToGui({
                value: cpm
              });
              cpc = HandleCurrencyFields.convertApiToGui({
                value: cpc
              });
              cpa = HandleCurrencyFields.convertApiToGui({
                value: cpa
              });
              cpd = HandleCurrencyFields.convertApiToGui({
                value: cpd
              });
              cpl = HandleCurrencyFields.convertApiToGui({
                value: cpl
              });
              cpe = HandleCurrencyFields.convertApiToGui({
                value: cpe
              });
              cpv = HandleCurrencyFields.convertApiToGui({
                value: cpv
              });
              cpi = HandleCurrencyFields.convertApiToGui({
                value: cpi
              });
              cpvm = HandleCurrencyFields.convertApiToGui({
                value: cpvm
              });
              return {
                ...item,
                id: item?.uuid,
                name,
                container_name,
                position_name,
                position_uuid,
                floor_price,
                noStore: false,
                cpm,
                cpc,
                cpa,
                cpd,
                cpl,
                cpe,
                cpv,
                cpi,
                cpvm
              };
            })
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

  React.useEffect(() => {
    return () => {
      dispatch(setStrategyInventoryListRedux({inventoryList: []}));
      dispatch(setStrategyInventoryTempListRedux({inventoryList: []}));
      dispatch(initializedStrategyRedux(false));
    };
  }, [dispatch]);

  return (
    <CampaignContentLayout
      heading={t('strategyEdit')}
      subHeading={t('strategyPageDescription')}
    >
      <StrategyContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {isFetched && status === 'success' && (
          <Row>
            <Col md="12">
              <StrategyEditTabs
                currentStrategy={strategy}
                isCreate={false}
                campaignId={strategyData?.campaign_uuid}
                originalStrategy={strategyData}
              />
            </Col>
          </Row>
        )}
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyEdit);

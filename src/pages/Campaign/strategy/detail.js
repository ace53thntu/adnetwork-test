// Build-in Modules

import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Strategy';
import {useGetStrategy} from 'queries/strategy';
import {
  initStrategyInventoryListRedux,
  selectedStrategyIdRedux,
  setStrategyInventoryListRedux,
  setStrategyInventoryTempListRedux,
  useSelectedStrategyIdSelector
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
  const strategyIdRedux = useSelectedStrategyIdSelector();

  const {data: strategyData, isFetching, status} = useGetStrategy(strategyId);

  const strategy = apiToForm({strategyData});

  // Initializing inventory in strategy
  React.useEffect(() => {
    if (
      strategy &&
      Object.keys(strategy).length > 0 &&
      status === QueryStatuses.SUCCESS &&
      strategyIdRedux !== strategyId
    ) {
      dispatch(
        initStrategyInventoryListRedux({
          inventoryList: strategy?.inventories,
          inventoryTempList: strategy?.inventories
        })
      );
      dispatch(selectedStrategyIdRedux(strategyId));
    }
  }, [dispatch, status, strategy, strategyId, strategyIdRedux]);

  useRedirectInCampaign();

  React.useEffect(() => {
    return () => {
      dispatch(setStrategyInventoryListRedux({inventoryList: []}));
      dispatch(setStrategyInventoryTempListRedux({inventoryList: []}));
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

export default React.memo(StrategyDetail);

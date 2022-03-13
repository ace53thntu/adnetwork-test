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
import {initStrategyInventoryListRedux} from 'store/reducers/campaign';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';
import {CampaignContentLayout} from '../layout';
import {StrategyContainerStyled} from './styled';
import StrategyViewTabs from './ViewTabs';

const StrategyDetail = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isInitialized, setInitialized] = React.useState(false);
  const {strategyId, campaignId} = useParams();

  const {data: strategyData, isFetching, isFetched, status} = useGetStrategy(
    strategyId
  );

  const strategy = apiToForm({strategyData});

  // Initializing inventory in strategy
  React.useEffect(() => {
    if (
      strategy &&
      Object.keys(strategy).length > 0 &&
      status === 'success' &&
      !isInitialized
    ) {
      dispatch(
        initStrategyInventoryListRedux({
          inventoryList: strategy?.inventories,
          inventoryTempList: strategy?.inventories
        })
      );
      setInitialized(true);
    }
  }, [strategy, dispatch, isFetched, isInitialized, status]);

  useRedirectInCampaign();

  return (
    <CampaignContentLayout
      heading={t('strategyDetail')}
      subHeading={t('strategyPageDescription')}
    >
      <StrategyContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {isFetched && status === 'success' && (
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

// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Strategy';
import {useGetStrategy} from 'queries/strategy';
import {CampaignContentLayout} from '../layout';
import StrategyEditTabs from './EditTabs';
import {StrategyContainerStyled} from './styled';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';
import {
  initStrategyInventoryListRedux,
  setStrategyInventoryListRedux,
  setStrategyInventoryTempListRedux
} from 'store/reducers/campaign';
import {useDispatch} from 'react-redux';

const StrategyEdit = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {strategyId} = useParams();
  const [isInitialized, setInitialized] = React.useState(false);

  const {data: strategyData, isFetching, isFetched, status} = useGetStrategy(
    strategyId
  );
  console.log(
    '🚀 ~ file: edit.js ~ line 27 ~ StrategyEdit ~ strategyData',
    strategyData
  );

  const strategy = apiToForm({strategyData});
  useRedirectInCampaign();

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

  React.useEffect(() => {
    return () => setInitialized(false);
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(setStrategyInventoryListRedux({inventoryList: []}));
      dispatch(setStrategyInventoryTempListRedux({inventoryList: []}));
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
              />
            </Col>
          </Row>
        )}
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyEdit);

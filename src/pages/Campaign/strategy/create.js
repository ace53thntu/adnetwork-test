// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {apiToForm} from 'entities/Strategy';
import {CampaignContentLayout} from '../layout';
import StrategyEditTabs from './EditTabs';
import {StrategyContainerStyled} from './styled';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';
import {useParams} from 'react-router-dom';
import {useGetCampaign} from 'queries/campaign';
import {LoadingIndicator} from 'components/common';
import {useDispatch} from 'react-redux';
import {initStrategyInventoryListRedux} from 'store/reducers/campaign';

const StrategyCreate = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {campaignId} = useParams();
  const {data: campaignDetail, isFetching, isFetched} = useGetCampaign({
    cid: campaignId,
    enabled: !!campaignId
  });

  const strategy = apiToForm({
    strategyData: {},
    campaignDetail
  });
  useRedirectInCampaign();

  React.useEffect(() => {
    dispatch(
      initStrategyInventoryListRedux({
        inventoryList: [],
        inventoryTempList: []
      })
    );
  }, [dispatch]);

  return (
    <CampaignContentLayout
      heading={t('strategyCreate')}
      subHeading={t('strategyPageDescription')}
    >
      <StrategyContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {isFetched && (
          <Row>
            <Col md="12">
              <StrategyEditTabs currentStrategy={strategy} isCreate />
            </Col>
          </Row>
        )}
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyCreate);

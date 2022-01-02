// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Strategy';
import {useGetStrategy} from 'queries/strategy';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import {usePositionOptions} from '../hooks';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {StrategyContainerStyled} from './styled';
import StrategyViewTabs from './ViewTabs';

const StrategyDetail = () => {
  const {t} = useTranslation();
  const {strategyId, campaignId} = useParams();
  const positions = usePositionOptions();
  const {data: strategyData, isFetching, isFetched, status} = useGetStrategy(
    strategyId
  );

  const strategy = apiToForm({strategyData, positions});
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
                positions={positions}
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

// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {apiToForm} from 'entities/Strategy';
import {CampaignContentLayout} from '../layout';
import {usePositionOptions} from '../hooks';
import StrategyEditTabs from './EditTabs';
import {StrategyContainerStyled} from './styled';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';
import {useParams} from 'react-router-dom';
import {useGetCampaign} from 'queries/campaign';
import {LoadingIndicator} from 'components/common';

const StrategyCreate = () => {
  const {t} = useTranslation();
  const {campaignId} = useParams();
  const {data: campaignDetail, isFetching, isFetched} = useGetCampaign({
    cid: campaignId,
    enabled: !!campaignId
  });

  const positionOptions = usePositionOptions();

  const strategy = apiToForm({
    strategyData: {},
    positions: positionOptions,
    campaignDetail
  });
  useRedirectInCampaign();

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
              <StrategyEditTabs
                currentStrategy={strategy}
                positions={positionOptions}
                isCreate
              />
            </Col>
          </Row>
        )}
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyCreate);

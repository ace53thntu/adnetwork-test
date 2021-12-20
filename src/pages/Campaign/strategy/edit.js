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
import {usePositionOptions} from '../hooks';
import StrategyEditTabs from './EditTabs';
import {StrategyContainerStyled} from './styled';

const StrategyEdit = () => {
  const {t} = useTranslation();
  const {strategyId} = useParams();
  const positionOptions = usePositionOptions();
  const {data: strategyData, isFetching, isFetched, status} = useGetStrategy(
    strategyId
  );

  const strategy = apiToForm({strategyData, positions: positionOptions});

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
              <StrategyEditTabs currentStrategy={strategy} />
            </Col>
          </Row>
        )}
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyEdit);

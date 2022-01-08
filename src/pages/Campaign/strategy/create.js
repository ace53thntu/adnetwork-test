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

const StrategyCreate = () => {
  const {t} = useTranslation();
  const positionOptions = usePositionOptions();

  const strategy = apiToForm({strategyData: {}, positions: positionOptions});
  useRedirectInCampaign();

  return (
    <CampaignContentLayout
      heading={t('strategyCreate')}
      subHeading={t('strategyPageDescription')}
    >
      <StrategyContainerStyled fluid>
        <Row>
          <Col md="12">
            <StrategyEditTabs
              currentStrategy={strategy}
              positions={positionOptions}
              isCreate
            />
          </Col>
        </Row>
      </StrategyContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyCreate);

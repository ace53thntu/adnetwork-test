// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {usePositionOptions} from '../hooks';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import StrategyForm from './form';

const StrategyCreate = () => {
  const {t} = useTranslation();
  const positionOptions = usePositionOptions();

  return (
    <CampaignContentLayout
      heading={t('strategyCreate')}
      subHeading={t('strategyPageDescription')}
    >
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <StrategyForm isCreate positions={positionOptions} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CampaignContentLayout>
  );
};

export default React.memo(StrategyCreate);

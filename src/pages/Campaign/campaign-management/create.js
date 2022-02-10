// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignEditTabs} from '.';
import {apiToForm} from 'entities/Campaign';

const CampaignCreate = () => {
  const {t} = useTranslation();
  const currentCampaign = apiToForm({});

  return (
    <CampaignContentLayout
      heading={t('campaignCreate')}
      subHeading={t('campaignPageDescription')}
    >
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <CampaignEditTabs isCreate currentCampaign={currentCampaign} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignCreate);

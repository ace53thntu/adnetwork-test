// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignTabs} from '.';

const CampaignCreate = () => {
  const {t} = useTranslation();

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
                <CampaignTabs isCreate />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignCreate);

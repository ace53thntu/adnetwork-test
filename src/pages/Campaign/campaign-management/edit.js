// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {useGetCampaign} from 'queries/campaign';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Card, CardBody, Col, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignContainerStyled} from './styled';
import {CampaignTabs} from '.';

const CampaignEdit = () => {
  const {t} = useTranslation();
  const {campaignId} = useParams();
  const {data: campaign, isFetching, isFetched} = useGetCampaign(campaignId);

  return (
    <CampaignContentLayout
      heading={t('campaignEdit')}
      subHeading={t('campaignPageDescription')}
    >
      <CampaignContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {isFetched && (
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <CampaignTabs isEdit currentCampaign={campaign} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </CampaignContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignEdit);

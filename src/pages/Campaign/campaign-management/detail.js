// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {useGetCampaign} from 'queries/campaign';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {CampaignTabs} from '.';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignContainerStyled} from './styled';

const CampaignDetail = () => {
  const {t} = useTranslation();
  const {campaignId} = useParams();
  const {data: campaign, isFetching, isFetched} = useGetCampaign(campaignId);

  return (
    <CampaignContentLayout
      heading={t('campaignDetail')}
      subHeading={t('campaignPageDescription')}
    >
      <CampaignContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {isFetched && (
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <CampaignTabs isView currentCampaign={campaign} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </CampaignContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignDetail);

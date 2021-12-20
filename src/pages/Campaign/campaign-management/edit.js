// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {useGetCampaign} from 'queries/campaign';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignContainerStyled} from './styled';
import {CampaignTabs} from '.';
import {apiToForm} from 'entities/Campaign';

const CampaignEdit = () => {
  const {t} = useTranslation();
  const {campaignId} = useParams();
  const {data: campaign, isFetching, isFetched} = useGetCampaign(campaignId);
  const campaignDestructure = apiToForm({campaign});

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
              <CampaignTabs isEdit currentCampaign={campaignDestructure} />
            </Col>
          </Row>
        )}
      </CampaignContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignEdit);

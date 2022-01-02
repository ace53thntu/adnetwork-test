// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Campaign';
import {useGetCampaign} from 'queries/campaign';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import {CampaignTabs} from '.';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignContainerStyled} from './styled';

const CampaignDetail = () => {
  const {t} = useTranslation();
  const {campaignId} = useParams();
  const {data: campaign, isFetching, isFetched} = useGetCampaign({
    cid: campaignId,
    enabled: !!campaignId
  });
  const campaignDestructure = apiToForm({campaign});
  useRedirectInCampaign();

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
              <CampaignTabs isView currentCampaign={campaignDestructure} />
            </Col>
          </Row>
        )}
      </CampaignContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignDetail);

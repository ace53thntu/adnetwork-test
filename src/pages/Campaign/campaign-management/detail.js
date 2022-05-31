// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {apiToForm} from 'entities/Campaign';
import {useGetCampaign} from 'queries/campaign';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import {useRedirectInCampaign} from '../hooks/useRedirectInCampaign';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignContainerStyled} from './styled';
import CampaignViewTabs from './ViewTabs';
import {Button} from "antd";

const CampaignDetail = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {campaignId} = useParams();

  const {data: campaign, isFetching, isFetched} = useGetCampaign({
    cid: campaignId,
    enabled: !!campaignId
  });

  const campaignDestructure = apiToForm({campaign});
  useRedirectInCampaign();

  const goToCreate = React.useCallback(() => {
    navigate(`/campaign/create`);
  }, [navigate]);

  return (
    <CampaignContentLayout
      heading={t('campaignDetail')}
      subHeading={t('campaignPageDescription')}
      // actionPageTitle={actionPageTitle}
    >
      <CampaignContainerStyled fluid>
        <div className="justify-content-end d-flex mb-3">
          <Button type="primary" onClick={goToCreate}>{t('createNewCampaign')}</Button>
        </div>
        {isFetching && <LoadingIndicator />}
        {isFetched && (
          <Row>
            <Col md="12">
              <CampaignViewTabs currentCampaign={campaignDestructure} />
            </Col>
          </Row>
        )}
      </CampaignContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignDetail);

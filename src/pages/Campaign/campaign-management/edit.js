// Build-in Modules
import {LoadingIndicator} from 'components/common';
import {useGetCampaign} from 'queries/campaign';
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignContainerStyled} from './styled';
import {CampaignEditTabs} from '.';
import {apiToForm} from 'entities/Campaign';

const CampaignEdit = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {campaignId} = useParams();
  const {data: campaign, isFetching, isFetched} = useGetCampaign({
    cid: campaignId,
    enabled: !!campaignId
  });
  const campaignDestructure = apiToForm({campaign});

  const goToCreate = React.useCallback(() => {
    navigate(`/campaign/create`);
  }, [navigate]);

  const actionPageTitle = React.useMemo(
    () => ({
      actions: t('createNewCampaign'),

      onClick: goToCreate
    }),
    [goToCreate, t]
  );

  return (
    <CampaignContentLayout
      heading={t('campaignEdit')}
      subHeading={t('campaignPageDescription')}
      actionPageTitle={actionPageTitle}
    >
      <CampaignContainerStyled fluid>
        {isFetching && <LoadingIndicator />}
        {isFetched && (
          <Row>
            <Col md="12">
              <CampaignEditTabs isEdit currentCampaign={campaignDestructure} />
            </Col>
          </Row>
        )}
      </CampaignContainerStyled>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignEdit);

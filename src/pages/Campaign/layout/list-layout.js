import {useQueryString} from 'hooks';
// Build-in Modules
import React from 'react';
// External Modules
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';

import {CampaignList} from '../campaign-management';
import {StrategyList} from '../strategy';
// Internal Modules
import {CampaignContentLayout} from '.';
import {Button} from "antd";
import ViewModeCampaign from "../components/ViewModeCampaign";

const ListCampaignLayout = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const query = useQueryString();
  const mode = query.get('mode') || 'campaign';
  const advertiserId = query.get('advertiser_id') || '';
  const {campaignId} = useParams();
  const [typeView, setTypeView] = React.useState(mode);

  const advertiserQuery = advertiserId ? `advertiser_id=${advertiserId}` : '';

  const goToCreate = React.useCallback(() => {
    if (typeView === 'campaign') {
      navigate(`/campaign/create?${advertiserQuery}`);
      return;
    }

    if (typeView === 'strategy') {
      navigate(`/campaign/${campaignId}/strategy/create?${advertiserQuery}`);
      return;
    }
  }, [typeView, navigate, advertiserQuery, campaignId]);

/*  const actionPageTitle = React.useMemo(
    () => ({
      actions:
        typeView === 'campaign'
          ? t('createNewCampaign')
          : t('createNewStrategy'),
      onClick: goToCreate
    }),
    [goToCreate, t, typeView]
  );*/

  React.useEffect(() => {
    if (mode) {
      setTypeView(mode);
    }
  }, [mode, navigate]);

  const onChangeType = type => {
    setTypeView(type);
    navigate(`/campaign?mode=${type}`);
  };

  return (
    <CampaignContentLayout
      heading={t('campaignManagement')}
      subHeading={t('campaignPageDescription')}
      /*actionPageTitle={typeView === 'campaign' ? actionPageTitle : null}*/
    >
      <Container fluid>
        <div className="justify-content-start d-flex mb-3">
          <ViewModeCampaign value={typeView} onChange={onChangeType} />
          <div className="justify-content-end d-flex flex-fill">
            {typeView === 'campaign' && (
              <Button type="primary" onClick={goToCreate}>{t('createNewCampaign')}</Button>
            )}
          </div>
        </div>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                {typeView === 'campaign' ? (
                  <CampaignList />
                ) : (
                  <StrategyList status="active" />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CampaignContentLayout>
  );
};

export default React.memo(ListCampaignLayout);

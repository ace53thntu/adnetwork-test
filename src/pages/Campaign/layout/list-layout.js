// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Card, CardBody, Col, Container, CustomInput, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '.';
import {useNavigate, useParams} from 'react-router-dom';
import {useQueryString} from 'hooks';
import {CampaignList} from '../campaign-management';
import {StrategyList} from '../strategy';

const ListCampaignLayout = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const query = useQueryString();
  const mode = query.get('mode') || 'strategy';
  const {campaignId} = useParams();
  const [typeView, setTypeView] = React.useState('');

  const goToCreate = React.useCallback(() => {
    if (typeView === 'campaign') {
      navigate(`/campaign/create`);
      return;
    }

    if (typeView === 'strategy') {
      navigate(`/campaign/${campaignId}/strategy/create`);
      return;
    }
  }, [navigate, typeView, campaignId]);

  const actionPageTitle = React.useMemo(
    () => ({
      actions:
        typeView === 'campaign'
          ? t('createNewCampaign')
          : t('createNewStrategy'),
      onClick: goToCreate
    }),
    [goToCreate, t, typeView]
  );

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
      actionPageTitle={actionPageTitle}
    >
      <Container fluid>
        <div className="justify-content-end d-flex mb-3">
          <CustomInput
            onChange={() => onChangeType('campaign')}
            type="radio"
            id={'campaign'}
            label={t('viewByCampaign')}
            className="mr-4"
            name="view_mode"
            checked={typeView === 'campaign'}
          />
          <CustomInput
            onChange={() => onChangeType('strategy')}
            type="radio"
            id={'strategy'}
            label={t('viewByStrategy')}
            checked={typeView === 'strategy'}
            name="view_mode"
          />
        </div>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                {typeView === 'campaign' ? <CampaignList /> : <StrategyList />}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CampaignContentLayout>
  );
};

export default React.memo(ListCampaignLayout);

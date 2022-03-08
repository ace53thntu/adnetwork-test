// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';

// Internal Modules
import {CampaignContentLayout} from '../layout';
import {CampaignEditTabs} from '.';
import {apiToForm} from 'entities/Campaign';
import {useQueryString} from 'hooks';
import {useGetAdvertiser} from 'queries/advertiser';
import {getRole, getUser} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';

const CampaignCreate = () => {
  const {t} = useTranslation();
  const query = useQueryString();
  const user = getUser();
  const role = getRole();
  let advertiserId = query.get('advertiser_id');
  if (!advertiserId && role === USER_ROLE.ADVERTISER && user.reference_uuid) {
    advertiserId = user.reference_uuid;
  }
  const {data: advertiser, status} = useGetAdvertiser(
    advertiserId,
    !!advertiserId
  );

  const currentCampaign = apiToForm({advertiser});

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
                {(!advertiserId || status === 'success') && (
                  <CampaignEditTabs
                    isCreate
                    currentCampaign={currentCampaign}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CampaignContentLayout>
  );
};

export default React.memo(CampaignCreate);

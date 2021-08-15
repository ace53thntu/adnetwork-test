//---> Build-in Modules
import React, {Fragment} from 'react';

//---> External Modules
import {Container} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import DetailCampaignForm from './DetailCampaignForm';

const CampaignForm = ({
  isEdit = false,
  campaignId = undefined,
  listAdvertisers = [],
  campaignTree = [],
  labelsData = [],
  currentCampaign = null
}) => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <PageTitleAlt
        heading={isEdit ? t('campaignDetail') : t('createCampaign')}
        subheading={t('campaignPageDescription')}
        icon="pe-7s-plane icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <DetailCampaignForm
          isEdit={isEdit}
          currentCampaign={currentCampaign}
          listAdvertisers={listAdvertisers}
          campaignTree={campaignTree}
          labelsData={labelsData}
        />
      </Container>
    </Fragment>
  );
};

export default CampaignForm;

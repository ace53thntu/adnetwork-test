import React from 'react';
import DescriptionStrategy from './DescriptionStrategy';
import {Divider} from '..';
import Audience from './Audience';
import Concept from './Concept';
import {Button} from 'reactstrap';
import {useTranslation} from 'react-i18next';

const Summary = ({
  campaignId,
  isEdit,
  currentStrategy,
  gotoCampaignManagement,
  viewOnly,
  listCampaignOptions,
  goTo
}) => {
  const {t} = useTranslation();

  return (
    <>
      <DescriptionStrategy
        campaignId={campaignId}
        isEdit={isEdit}
        currentStrategy={currentStrategy}
        gotoCampaignManagement={gotoCampaignManagement}
        viewOnly={viewOnly}
        listCampaignOptions={listCampaignOptions}
        goTo={goTo}
        isSummary
      />
      <Divider text={'Audience'} />
      <Audience />
      <Divider text={'Concept'} />
      <Concept isSummary />
      <div className="d-block text-right mr-15">
        <Button
          onClick={() => gotoCampaignManagement()}
          className="mb-2 mr-2 btn-icon"
          color="secondary"
        >
          <i className="pe-7s-refresh btn-icon-wrapper"> </i>
          {t('cancel')}
        </Button>
        <Button type="submit" className="mb-2 mr-2 btn-icon" color="success">
          <i className="pe-7s-upload btn-icon-wrapper"> </i>
          {t('save')}
        </Button>
      </div>
    </>
  );
};

export default Summary;

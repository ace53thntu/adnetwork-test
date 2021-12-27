import React from 'react';
import {Divider} from '../../components';
import Concept from './Concept';
import {Button} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import StrategyForm from '../form';

const Summary = ({
  campaignId,
  isEdit,
  currentStrategy,
  gotoCampaignManagement,
  isView,
  listCampaignOptions,
  goTo,
  positions = []
}) => {
  const {t} = useTranslation();

  return (
    <>
      <StrategyForm
        campaignId={campaignId}
        isEdit
        currentStrategy={currentStrategy}
        gotoCampaignManagement={gotoCampaignManagement}
        goTo={goTo}
        positions={positions}
      />
      <Divider text={'Audience'} />
      {/* <Audience /> */}
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

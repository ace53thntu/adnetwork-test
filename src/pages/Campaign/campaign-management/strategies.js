import React from 'react';
import {useParams} from 'react-router-dom';
import {StrategyList} from '../strategy';

const CampaignStrategies = () => {
  const {campaignId} = useParams();

  return <StrategyList campaignId={campaignId} />;
};

export default React.memo(CampaignStrategies);

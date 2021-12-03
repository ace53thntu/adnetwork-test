import React from 'react';

import PropTypes from 'prop-types';
import {useParams} from 'react-router';

import {useGetCampaign} from 'queries/campaign';
import CampaignForm from './CampaignForm';

const propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool
};

const EditCampaign = ({isEdit, isView}) => {
  const {id: campaignId} = useParams();
  const listAdvertisers = [];
  const campaignTree = [];
  const {data: currentCampaign} = useGetCampaign(campaignId);
  const labelsData = [];

  return campaignId && listAdvertisers && currentCampaign ? (
    <CampaignForm
      isEdit={isEdit}
      isView={isView}
      campaignId={campaignId}
      listAdvertisers={listAdvertisers}
      campaignTree={campaignTree}
      labelsData={labelsData}
      currentCampaign={currentCampaign}
    />
  ) : null;
};

EditCampaign.propTypes = propTypes;

export default EditCampaign;

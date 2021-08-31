import {useGetCampaign} from 'queries/campaign';
import React, {memo} from 'react';
import {useParams} from 'react-router';
import CampaignForm from './CampaignForm';
// import {
//   useGetAdvertisers,
//   useGetCampaign,
//   useGetCampaigns,
//   useGetLabels
// } from 'core/queries/campaigns';

const EditCampaign = props => {
  const {id: campaignId} = useParams();
  // const {data: listAdvertisers} = useGetAdvertisers();
  const listAdvertisers = [];
  const campaignTree = []; //useGetCampaigns();
  const {data: currentCampaign} = useGetCampaign(campaignId);
  console.log(
    '🚀 ~ file: EditCampaign.js ~ line 18 ~ currentCampaign',
    currentCampaign
  );
  // const advertiserId = undefined;
  // const {data: labelsData} = useGetLabels(advertiserId);
  const labelsData = [];

  return campaignId && listAdvertisers && currentCampaign ? (
    <CampaignForm
      isEdit={props.isEdit}
      campaignId={campaignId}
      listAdvertisers={listAdvertisers}
      campaignTree={campaignTree}
      labelsData={labelsData}
      currentCampaign={currentCampaign}
    />
  ) : null;
};

export default memo(EditCampaign);

import React from 'react';
import CampaignForm from './CampaignForm';
// import {
//   useGetAdvertisers,
//   useGetCampaigns,
//   useGetLabels
// } from 'core/queries/campaigns';

const AddCampaign = () => {
  // const {data: listAdvertisers} = useGetAdvertisers();
  const listAdvertisers = [];
  const campaignTree = []; //useGetCampaigns();
  // const advertiserId = undefined;
  // const {data: labelsData} = useGetLabels(advertiserId);
  const labelsData = [];
  return (
    <CampaignForm
      listAdvertisers={listAdvertisers}
      campaignTree={campaignTree}
      labelsData={labelsData}
    />
  );
};

export default AddCampaign;

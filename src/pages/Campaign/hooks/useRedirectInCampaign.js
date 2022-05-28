import {
  setCampaignRedux,
  setStrategyRedux,
  useCampaignSelector
} from 'store/reducers/campaign';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {useQueryString} from 'hooks';
import {useGetCampaigns} from 'queries/campaign';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useGetStrategies} from 'queries/strategy';
import {getResponseData} from 'utils/helpers/misc.helpers';

export function useRedirectInCampaign() {
  const {campaignId, strategyId} = useParams();

  const query = useQueryString();
  const advertiserId = query.get('advertiser_id');

  const dispatch = useDispatch();
  const {isLoading, alreadySetAdvertiser} = useCampaignSelector();

  const {data: campRes, status: campaignsStatus, isFetched} = useGetCampaigns({
    params: {
      advertiser_uuid: advertiserId,
      per_page: DEFAULT_PAGINATION.perPage
    },
    enabled: !!advertiserId && !alreadySetAdvertiser
  });
  const campaigns = getResponseData(campRes, IS_RESPONSE_ALL);

  const {data: strategyRes, status: strategyStatus} = useGetStrategies({
    params: {
      campaign_uuid: campaignId,
      per_page: DEFAULT_PAGINATION.perPage
    },
    enabled: !!campaignId && isFetched && !alreadySetAdvertiser
  });

  const strategies = getResponseData(strategyRes, IS_RESPONSE_ALL);

  const destructureCampaigns = React.useMemo(
    () =>
      campaigns?.map(item => {
        const campaignNode = {
          id: item.uuid,
          name: item.name,
          children: [],
          numChildren: item?.total_strategies || 0,
          page: 0,
          expanded: false,
          selected: false,
          parentId: advertiserId,
          isCampaign: true,
          advertiserId
        };
        return campaignNode;
      }),
    [advertiserId, campaigns]
  );

  const destructureStrategies = React.useMemo(
    () =>
      strategies?.map(item => {
        const campaignNode = {
          id: item.uuid,
          name: item.name,
          children: [],
          numChildren: 0,
          page: 0,
          expanded: false,
          selected: false,
          parentId: campaignId,
          isStrategy: true,
          advertiserId
        };
        return campaignNode;
      }),
    [advertiserId, campaignId, strategies]
  );

  React.useEffect(() => {
    if (!isLoading && !alreadySetAdvertiser) {
      if (strategyId) {
        if (strategyStatus === 'success') {
          dispatch(
            setStrategyRedux(
              advertiserId,
              campaignId,
              strategyId,
              destructureCampaigns,
              destructureStrategies
            )
          );
        }
        return;
      } else if (campaignId && campaignsStatus === 'success') {
        dispatch(
          setCampaignRedux(advertiserId, campaignId, destructureCampaigns)
        );
      }
    }
  }, [
    advertiserId,
    alreadySetAdvertiser,
    campaignId,
    destructureCampaigns,
    campaignsStatus,
    dispatch,
    isLoading,
    strategyId,
    strategyStatus,
    destructureStrategies
  ]);

  return;
}

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
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useGetStrategies} from 'queries/strategy';

export function useRedirectInCampaign() {
  const {campaignId, strategyId} = useParams();

  const query = useQueryString();
  const advertiserId = query.get('advertiser_id');

  const dispatch = useDispatch();
  const {isLoading, alreadySetAdvertiser} = useCampaignSelector();

  const {
    data: {items: campaigns = []} = {},
    status: campaignsStatus,
    isFetched
  } = useGetCampaigns({
    params: {
      advertiser_uuid: advertiserId,
      limit: DEFAULT_PAGINATION.perPage
    },
    enabled: !!advertiserId
  });

  const {
    data: {items: strategies = []} = {},
    status: strategyStatus
  } = useGetStrategies({
    params: {
      campaign_uuid: campaignId,
      limit: DEFAULT_PAGINATION.perPage
    },
    enabled: !!campaignId && isFetched
  });

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

  // React.useEffect(() => {
  //   if (!!containerRedux) {
  //     const redirectURL = containerRedux.source?.[source]?.[0]?.id;
  //     if (redirectURL && !pageId) {
  //       navigate(redirectURL);
  //     }
  //   }
  // }, [containerRedux, navigate, source, pageId]);

  return {
    // isFetching,
    // error,
    // isError
  };
}

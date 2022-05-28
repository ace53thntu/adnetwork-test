import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {CampaignAPIRequest} from 'api/campaign.api';
import {StrategyAPIRequest} from 'api/strategy.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setAdvertisersRedux} from 'store/reducers/campaign';
import {
  getResponseData,
  getResponsePagination,
  isValidResponse
} from 'utils/helpers/misc.helpers';

import {advertisersMapData} from '../dto';

export function useRefreshAdvertiserTree() {
  const dispatch = useDispatch();

  const refresh = React.useCallback(
    async (advId, campaignId, strategyId) => {
      const params = {
        page: 1,
        per_page: DEFAULT_PAGINATION.perPage,
        sort: 'created_at DESC',
        status: 'active'
      };

      const res = await AdvertiserAPIRequest.getAllAdvertiser({
        params,
        options: {
          isResponseAll: IS_RESPONSE_ALL
        }
      });

      if (isValidResponse(res, IS_RESPONSE_ALL)) {
        const items = advertisersMapData(getResponseData(res, IS_RESPONSE_ALL));

        const campaignRes = await CampaignAPIRequest.getAllCampaign({
          params: {
            advertiser_uuid: advId,
            per_page: DEFAULT_PAGINATION.perPage
          },
          options: {isResponseAll: IS_RESPONSE_ALL}
        });
        const campaigns = getResponseData(campaignRes, IS_RESPONSE_ALL);
        const destructureCampaigns = campaigns?.map(item => {
          const campaignNode = {
            id: item.uuid,
            name: item.name,
            children: [],
            numChildren: item?.total_strategies || 0,
            page: 0,
            expanded: false,
            selected: false,
            parentId: advId,
            isCampaign: true,
            advertiserId: advId
          };
          return campaignNode;
        });

        //---> Strategy
        if (strategyId) {
          const strategyRes = await StrategyAPIRequest.getAllStrategy({
            params: {
              campaign_uuid: campaignId,
              per_page: DEFAULT_PAGINATION.perPage
            },
            options: {isResponseAll: IS_RESPONSE_ALL}
          });
          const strategies = getResponseData(strategyRes, IS_RESPONSE_ALL);
          const destructuredStrategies = strategies?.map(item => {
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
              advertiserId: advId
            };
            return campaignNode;
          });
          dispatch(
            setAdvertisersRedux(
              items,
              1,
              getResponsePagination(res).totalItems,
              advId,
              campaignId,
              destructureCampaigns,
              strategyId,
              destructuredStrategies
            )
          );
          return;
        }

        dispatch(
          setAdvertisersRedux(
            items,
            1,
            getResponsePagination(res).totalItems,
            advId,
            campaignId,
            destructureCampaigns
          )
        );

      }
    },
    [dispatch]
  );

  return {
    refresh
  };
}

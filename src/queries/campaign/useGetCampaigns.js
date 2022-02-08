import {CampaignAPIRequest} from 'api/campaign.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_CAMPAIGNS} from './constants';

export function useGetCampaigns({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CAMPAIGNS, params],
    () =>
      CampaignAPIRequest.getAllCampaign({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}

export function useGetCampaignsInfinity({
  page = DEFAULT_PAGINATION.page,
  limit = DEFAULT_PAGINATION.perPage,
  name = '',
  enabled = false,
  params = {},
  key = GET_CAMPAIGNS
}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [key, page, limit, name, params],
    ({pageParam = 1}) =>
      CampaignAPIRequest.getAllCampaign({
        params: {
          ...params,
          page: pageParam,
          limit,
          name
        },
        options: {
          cancelToken,
          isAllResponse: IS_RESPONSE_ALL
        }
      }).then(res => res),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = getResponsePagination(apiRes)?.total;
        const perPage =
          getResponsePagination(apiRes)?.perPage || DEFAULT_PAGINATION.perPage;
        const nextPage = Math.ceil(total / perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}

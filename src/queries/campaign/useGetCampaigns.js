import {CampaignAPIRequest} from 'api/campaign.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_CAMAPAIGNS} from './constants';

export function useGetCampaigns({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CAMAPAIGNS, params],
    () =>
      CampaignAPIRequest.getAllCampaign({
        params,
        options: {cancelToken, isAllResponse: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}

export function useGetCampaignsInfinity({
  page = DEFAULT_PAGINATION.page,
  per_page = DEFAULT_PAGINATION.perPage,
  name = '',
  enabled = false,
  params = {},
  key = GET_CAMAPAIGNS
}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [key, page, per_page, name, params],
    ({pageParam = 1}) =>
      CampaignAPIRequest.getAllCampaign({
        params: {
          ...params,
          page: pageParam,
          per_page,
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

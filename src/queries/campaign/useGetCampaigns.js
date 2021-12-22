import {CampaignAPIRequest} from 'api/campaign.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_CAMAPAIGNS} from './constants';

export function useGetCampaigns() {
  return useQuery(
    GET_CAMAPAIGNS,
    () => CampaignAPIRequest.getAllCampaign({}).then(res => res?.data ?? []),
    {
      suspense: false
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
          cancelToken
        }
      }).then(res => res?.data),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = apiRes?.total;
        const nextPage = Math.ceil(total / DEFAULT_PAGINATION.perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}

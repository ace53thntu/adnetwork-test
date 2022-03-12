import {useInfiniteQuery, useQuery} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {GET_REPORTS} from './constants';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

/**
 * Query get all reports
 * @returns Array data reports
 */
export function useGetReports({params, enabled = false}) {
  return useQuery(
    [GET_REPORTS, params?.entity_uuid || 'all', params?.entity_type || 'all'],
    () =>
      ReportAPIRequest.getAllReport({
        params,
        options: {isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}

/**
 * Query get report with pagination
 * @returns Array data reports
 */
export function useGetReportsInfinite({
  params,
  enabled = false,
  page = DEFAULT_PAGINATION.page
}) {
  return useInfiniteQuery(
    [GET_REPORTS, params?.entity_uuid || 'all', params?.entity_type || 'all'],
    ({pageParam = 1}) =>
      ReportAPIRequest.getAllReport({
        params: {...params, page: pageParam, limit: DEFAULT_PAGINATION.perPage},
        options: {isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = getResponsePagination(apiRes)?.totalItems;
        const perPage =
          getResponsePagination(apiRes)?.perPage || DEFAULT_PAGINATION.perPage;
        const nextPage = Math.ceil(total / perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}

import {useInfiniteQuery, useQuery} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {GET_REPORTS} from './constants';
import {DEFAULT_PAGINATION} from 'constants/misc';

/**
 * Query get all reports
 * @returns Array data reports
 */
export function useGetReports({params, enabled = false}) {
  return useQuery(
    [GET_REPORTS, params?.entity_uuid || 'all', params?.entity_type || 'all'],
    () => ReportAPIRequest.getAllReport({params}).then(res => res?.data ?? []),
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
export function useGetReportsInfinity({
  params,
  enabled = false,
  page = DEFAULT_PAGINATION.page
}) {
  return useInfiniteQuery(
    [GET_REPORTS, params?.entity_uuid || 'all', params?.entity_type || 'all'],
    ({pageParam = 1}) =>
      ReportAPIRequest.getAllReport({
        params: {...params, page: pageParam, limit: DEFAULT_PAGINATION.perPage}
      }).then(res => res?.data ?? []),
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

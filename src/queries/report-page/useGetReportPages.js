import {ReportPageAPIRequest} from 'api/report-page.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_REPORT_PAGES} from './constants';

/**
 * Query get all report pages
 * @returns Array data report pages
 */
export function useGetReportPages({params}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    GET_REPORT_PAGES,
    () =>
      ReportPageAPIRequest.getAllReportPage({
        params,
        options: {cancelToken}
      }).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}

/**
 * Query get report with pagination
 * @returns Array data reports
 */
export function useGetReportPagesInfinite({
  params,
  enabled = false,
  page = DEFAULT_PAGINATION.page
}) {
  return useInfiniteQuery(
    [GET_REPORT_PAGES, params],
    ({pageParam = 1}) =>
      ReportPageAPIRequest.getAllReportPage({
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

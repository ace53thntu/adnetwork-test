import {ReportPageAPIRequest} from 'api/report-page.api';
import {useQuery} from 'react-query';

import {GET_REPORT_PAGES} from './constants';

/**
 * Query get all report pages
 * @returns Array data report pages
 */
export function useGetReportPages() {
  return useQuery(
    GET_REPORT_PAGES,
    () =>
      ReportPageAPIRequest.getAllReportPage({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}

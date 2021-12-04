import {useQuery} from 'react-query';

import {ReportPageAPIRequest} from 'api/report-page.api';
import {useCancelRequest} from 'hooks';
import {GET_REPORT_PAGE} from './constants';

/**
 * Hook for get Report Page from API by query
 */
export function useGetReportPage(reportPageId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_REPORT_PAGE, reportPageId],
    () =>
      ReportPageAPIRequest.getReportPage({
        id: reportPageId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!reportPageId
    }
  );
}

import {useQuery} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {useCancelRequest} from 'hooks';
import {GET_REPORT} from './constants';

/**
 * Hook for get Report from API by query
 */
export function useGetReport(reportId, enabled = false) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_REPORT, reportId],
    () =>
      ReportAPIRequest.getReport({
        id: reportId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}

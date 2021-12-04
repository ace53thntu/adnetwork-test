import {useQuery} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {GET_REPORTS} from './constants';

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

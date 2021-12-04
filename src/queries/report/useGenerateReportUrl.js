import {useMutation, useQueryClient} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {useCancelRequest} from 'hooks';
import {REPORT_URL} from './constants';

/**
 * Generate a Report Url
 */
export function useGenerateReportUrl() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => ReportAPIRequest.generateReportUrl({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([REPORT_URL]);
      }
    }
  );
}

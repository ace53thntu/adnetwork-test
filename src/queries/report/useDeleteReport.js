import {useMutation, useQueryClient} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {GET_REPORTS} from './constants';

/**
 * Delete a Report
 */
export function useDeleteReport() {
  const client = useQueryClient();

  return useMutation(
    ({reportId}) =>
      ReportAPIRequest.deleteReport({
        id: reportId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_REPORTS]);
      }
    }
  );
}

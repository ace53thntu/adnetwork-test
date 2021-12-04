import {ReportPageAPIRequest} from 'api/report-page.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_REPORT_PAGES} from './constants';

/**
 * Delete a Report Page
 */
export function useDeleteReportPage() {
  const client = useQueryClient();

  return useMutation(
    ({reportPageId}) =>
      ReportPageAPIRequest.deleteReportPage({
        id: reportPageId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_REPORT_PAGES]);
      }
    }
  );
}

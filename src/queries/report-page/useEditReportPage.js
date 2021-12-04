import {ReportPageAPIRequest} from 'api/report-page.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_REPORT_PAGES} from './constants';

/**
 * Update a Report Page
 */
export function useEditReportPage() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({reportPageId, data}) =>
      ReportPageAPIRequest.editReportPage({
        id: reportPageId,
        data,
        options: {cancelToken}
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

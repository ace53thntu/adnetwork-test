import {useMutation, useQueryClient} from 'react-query';

import {ReportPageAPIRequest} from 'api/report-page.api';
import {useCancelRequest} from 'hooks';
import {GET_REPORT_PAGES} from './constants';

/**
 * Create a Report Page
 */
export function useCreateReportPage() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data =>
      ReportPageAPIRequest.createReportPage({data, options: {cancelToken}}),
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

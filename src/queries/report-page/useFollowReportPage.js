import {ReportPageAPIRequest} from 'api/report-page.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_REPORT_PAGES, GET_REPORT_PAGE} from './constants';

/**
 * Follow report page
 */
export function useFollowReportPage(pageId) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data =>
      ReportPageAPIRequest.followReportPage({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_REPORT_PAGES]);
        client.invalidateQueries([GET_REPORT_PAGE, pageId]);
      }
    }
  );
}

import {useMutation, useQueryClient} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {useCancelRequest} from 'hooks';
import {GET_REPORTS} from './constants';

/**
 * Update a Report
 */
export function useEditReport() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({reportId, data}) =>
      ReportAPIRequest.editReport({
        id: reportId,
        data,
        options: {cancelToken}
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

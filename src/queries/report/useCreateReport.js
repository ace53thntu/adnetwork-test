import {useMutation, useQueryClient} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {useCancelRequest} from 'hooks';
import {GET_REPORTS} from './constants';

/**
 * Create a Report
 */
export function useCreateReport({entityId, entityType}) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => ReportAPIRequest.createReport({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([
          GET_REPORTS,
          entityId || 'all',
          entityType || 'all'
        ]);
      }
    }
  );
}

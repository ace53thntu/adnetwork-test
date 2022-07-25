import {useMutation, useQueryClient} from 'react-query';

import {ReportAPIRequest} from 'api/report.api';
import {GET_REPORTS} from './constants';

/**
 * Create a Report
 */
export function useCreateReport({entityId, entityType}) {
  const client = useQueryClient();

  return useMutation(data => ReportAPIRequest.createReport({data}), {
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
  });
}

import {StrategyAPIRequest} from 'api/strategy.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_STRATEGIES} from './constants';

/**
 * Delete a Strategy
 */
export function useDeleteStrategy() {
  const client = useQueryClient();

  return useMutation(
    ({cid}) =>
      StrategyAPIRequest.deleteStrategy({
        id: cid
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_STRATEGIES]);
      }
    }
  );
}

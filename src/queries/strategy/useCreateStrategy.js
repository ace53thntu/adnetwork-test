import {StrategyAPIRequest} from 'api/strategy.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_STRATEGIES} from './constants';

/**
 * Create a Strategy
 */
export function useCreateStrategy() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => StrategyAPIRequest.createStrategy({data, options: {cancelToken}}),
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

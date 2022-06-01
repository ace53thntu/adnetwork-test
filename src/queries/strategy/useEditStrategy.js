import {StrategyAPIRequest} from 'api/strategy.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_STRATEGIES} from './constants';

/**
 * Edit a Strategy
 */
export function useEditStrategy() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({straId, data}) =>
      StrategyAPIRequest.editStrategy({
        id: straId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: responseData => {
        client.invalidateQueries([GET_STRATEGIES]);
      }
    }
  );
}

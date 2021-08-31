import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_ADVERTISERS} from './constants';

/**
 * Update an Advertiser
 */
export function useEditAdvertiser() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({advId, data}) =>
      AdvertiserAPIRequest.editAdvertiser({
        id: advId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_ADVERTISERS]);
      }
    }
  );
}

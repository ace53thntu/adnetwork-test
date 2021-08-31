import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_ADVERTISERS} from './constants';

/**
 * Create an Advertiser
 */
export function useCreateAdvertiser() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data =>
      AdvertiserAPIRequest.createAdvertiser({data, options: {cancelToken}}),
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

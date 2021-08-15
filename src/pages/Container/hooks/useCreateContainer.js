import {getPartnerId} from 'core/utils/auth';
import {useMutation, useQueryCache} from 'react-query';
import * as containerService from 'services/container';
import {CONTAINER, CONTAINERS} from './constants';

export default function useCreateContainer() {
  const cache = useQueryCache();
  const partnerId = getPartnerId();

  return useMutation(
    ({data}) => containerService.createContainer({data}).then(res => res.data),
    {
      onSuccess: data => {
        cache.invalidateQueries([CONTAINERS, partnerId], {
          exact: true
        });
        cache.invalidateQueries(CONTAINER, {
          refetchInactive: true
        });
      },
      throwOnError: true
    }
  );
}

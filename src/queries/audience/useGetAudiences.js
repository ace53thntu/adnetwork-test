import {AudienceAPIRequest} from 'api/audience.api';
import {useQuery} from 'react-query';

import {GET_AUDIENCES} from './constants';

export function useGetAudiences() {
  return useQuery(
    GET_AUDIENCES,
    () => AudienceAPIRequest.getAllAudience({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}

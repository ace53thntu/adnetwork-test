import {ConceptAPI} from 'api/concept.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CONCEPTS} from './constants';

export function useGetConcepts({params = {}, enabled = true}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CONCEPTS, params],
    () =>
      ConceptAPI.getConcepts({
        params,
        options: {
          cancelToken
        }
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}

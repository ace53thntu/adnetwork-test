import {ConceptAPI} from 'api/concept.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CONCEPT} from './constants';

export function useGetConcept({conceptId, enabled = true}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CONCEPT, conceptId],
    () =>
      ConceptAPI.getConcept({
        conceptId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? null),
    {
      suspense: false,
      enabled
    }
  );
}

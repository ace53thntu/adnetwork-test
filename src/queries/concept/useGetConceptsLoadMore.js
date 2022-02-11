import {ConceptAPI} from 'api/concept.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_CONCEPTS_LOAD_MORE} from './constants';

export function useGetConceptsLoadMore({params, enabled = true}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_CONCEPTS_LOAD_MORE, params],
    ({pageParam = 1}) => {
      return ConceptAPI.getConcepts({
        params: {
          page: pageParam,
          ...params
        },
        options: {
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => res);
    },
    {
      suspense: false,
      enabled,
      getNextPageParam: (res, pages) => {
        const nextPage = getResponsePagination(res)?.nextPage;

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}

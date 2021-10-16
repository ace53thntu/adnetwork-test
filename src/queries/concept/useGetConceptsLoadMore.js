import {ConceptAPI} from 'api/concept.api';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery} from 'react-query';

import {GET_CONCEPTS_LOAD_MORE} from './constants';

export function useGetConceptsLoadMore({advertiserId, limit, enabled = true}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_CONCEPTS_LOAD_MORE, advertiserId],
    ({pageParam = 1}) => {
      return ConceptAPI.getConcepts({
        params: {
          page: pageParam,
          limit,
          advertiser_uuid: advertiserId
        },
        options: {
          cancelToken
        }
      }).then(res => res);
    },
    {
      suspense: false,
      enabled,
      getNextPageParam: (res, pages) => {
        const lastPage = Math.ceil(res?.data?.total / limit);
        return lastPage > pages.length ? pages.length + 1 : false;
      }
    }
  );
}

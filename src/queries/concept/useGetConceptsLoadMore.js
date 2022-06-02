import {ConceptAPI} from 'api/concept.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_CONCEPTS_LOAD_MORE} from './constants';
import {CreativeAPI} from "../../api/creative.api";
import {VideoAPI} from "../../api/video.api";
import {NativeAdAPI} from "../../api/native-ad.api";

export function useGetConceptsLoadMore({params, enabled = true}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_CONCEPTS_LOAD_MORE, params],
    async ({pageParam = 1}) => {
      const response = await ConceptAPI.getConcepts({
        params: {
          page: pageParam,
          ...params
        },
        options: {
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      });

      const data = response?.data?.data;
      if (data) {
        let promises = [];
        data.forEach(item => {
          const { creatives, videos, nativeAds } = item || {};
          // is creative
          if(creatives){
            promises.push(
              CreativeAPI.getCreatives({
                params: {
                  concept_uuid: item?.uuid,
                  status: 'active',
                },
              })
            );
          } else if(videos) {
            promises.push(
              VideoAPI.getVideos({
                params: {
                  concept_uuid: item?.uuid,
                  status: 'active',
                }
              })
            );
          } else if(nativeAds) {
            promises.push(NativeAdAPI.getNativeAds({
              params: {
                concept_uuid: item?.uuid,
                status: 'active',
              },
            }));
          }
        })

        const promiseAll = await Promise.all(promises);
        let allConceptMedia = promiseAll.reduce((a, b) => a.concat(b?.data[0]), []);

        // set first media for concept list
        data.forEach(item => {
          const { uuid } = item || {};
          const conceptMedia = allConceptMedia.find(concept => concept.concept_uuid === uuid);
          if(conceptMedia){
            const { alternatives, files } = conceptMedia || {};

            // banner
            if(alternatives) {
              const firstFile = alternatives[0]?.file;
              const { uuid, type } = firstFile || {};
              item.fileUUID = uuid;
              item.fileType = type.toLowerCase();
            } else if(files) {
              // video
              const firstFile = files[0];
              const { uuid, type } = firstFile || {};
              item.fileUUID = uuid;
              item.fileType = type .toLowerCase();
            }
          }
        })
      }

      return response;
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

import {useQuery} from 'react-query';

import {MetricAPIRequest} from 'api/metric.api';
import {useCancelRequest} from 'hooks';
import {METRICS} from './constants';

/**
 * Hook for get Report from API by query
 */
export function useGetMetrics({url}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [METRICS, url],
    () =>
      MetricAPIRequest.getMetric({
        url,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!url
    }
  );
}

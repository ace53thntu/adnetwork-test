import {MetricAPIRequest} from 'api/metric.api';
import {useCancelRequest} from 'hooks';
import {EnumTypeStatistics} from 'pages/Campaign/components/StatisticMetrics/StatisticMetrics';
import {useQuery} from 'react-query';

import {METRICS} from './constants';

/**
 * Hook for get Statistic Metrics Report from API by query
 */
export function useGetStatisticMetrics({
  data,
  id,
  type = EnumTypeStatistics.Campaign,
  enabled = false
}) {
  const {cancelToken} = useCancelRequest();
  return useQuery([METRICS, id, data], async () => {
    const response = await MetricAPIRequest.getMetric({
      data,
      options: {
        cancelToken
      }
    });
    if (response?.data) {
      return parseData({
        id,
        metricData: response.data
      });
    }
    return {};
  });
}

const parseData = ({id, metricData}) => {
  const {report} = metricData || {};
  const listReport = Object.values(report);
  const statisticTotal = {
    adrequest: 0,
    impression: 0,
    click: 0,
    ctr: 0
  };
  listReport.forEach(item => {
    if (!!item && Object.keys(item).length && item[id]) {
      const campaignMetrics = item[id];
      statisticTotal.impression +=
        (campaignMetrics['external_impressions'] ?? 0) +
        (campaignMetrics['creative_impressions'] ?? 0) +
        (campaignMetrics['native_impressions'] ?? 0) +
        (campaignMetrics['video_impressions'] ?? 0);
      statisticTotal.click +=
        (campaignMetrics['creative_clicks'] ?? 0) +
        (campaignMetrics['native_clicks'] ?? 0) +
        (campaignMetrics['video_clicks'] ?? 0) +
        (campaignMetrics['external_clicks'] ?? 0);
      statisticTotal.adrequest +=
        (campaignMetrics['creative_bids'] ?? 0) +
        (campaignMetrics['native_bids'] ?? 0) +
        (campaignMetrics['video_bids'] ?? 0);
      statisticTotal.ctr = (
        (statisticTotal.click / statisticTotal.impression) *
        100
      ).toFixed(3);
    }
  });
  return {...metricData, statisticTotal};
};

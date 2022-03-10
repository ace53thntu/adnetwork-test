import React from 'react';
import {useGenerateReportUrl} from 'queries/report';
import {useDispatch} from 'react-redux';
import {
  setMetricBodyRedux,
  setMetricDataRedux
} from 'store/reducers/entity-report';
import ReportItem from './report-item';

const ReportItemContainer = ({reportItem, children}) => {
  const {source_uuid, report_source, report_type, api} = reportItem;
  const {time_range, time_unit, report_by, start_time, end_time} = api;
  const dispatch = useDispatch();
  const {mutateAsync: generateReportUrl, isLoading} = useGenerateReportUrl();
  const [metricData, setMetricData] = React.useState(null);

  React.useEffect(() => {
    async function getMetric() {
      const requestBody = {
        source_uuid: source_uuid,
        report_by_uuid: source_uuid,
        report_type,
        time_unit,
        time_range,
        report_source,
        report_by
      };
      if (report_type === 'distribution') {
        requestBody.start_time = start_time;
        requestBody.end_time = end_time;
      }
      try {
        const {data} = await generateReportUrl(requestBody);
        setMetricData(data);
        dispatch(setMetricBodyRedux(requestBody));
        dispatch(setMetricDataRedux(data));
      } catch (error) {
        // TODO: handle error generate report
      }
    }
    getMetric();
  }, [
    dispatch,
    end_time,
    generateReportUrl,
    report_by,
    report_source,
    report_type,
    source_uuid,
    start_time,
    time_range,
    time_unit
  ]);

  return (
    <ReportItem
      entityId={source_uuid}
      entityType={report_source}
      reportItem={reportItem}
      metrics={metricData}
      isFetching={isLoading}
    />
  );
};

export default ReportItemContainer;

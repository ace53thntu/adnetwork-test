//---> Build-in Modules
import {FormReactSelect} from 'components/forms';
import {
  PublisherReportBys,
  ReportBys,
  ReportGroupTypes
} from 'pages/entity-report/constants.js';
import {getReportByOptions} from 'pages/entity-report/utils/getReportByOptions';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {
  setMetricBodyRedux,
  useMetricsBodySelector,
  useReportGroupTypeSelector
} from 'store/reducers/entity-report';

const ReportBySelect = ({reportSource}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const reportGroupType = useReportGroupTypeSelector();
  const metricBody = useMetricsBodySelector();
  const {control} = useFormContext();
  const reportBySelected = useWatch({name: 'api.report_by', control});

  React.useEffect(() => {
    if (metricBody.report_by !== reportBySelected?.value) {
      dispatch(
        setMetricBodyRedux({
          ...metricBody,
          report_by: reportBySelected?.value,
          report_by_uuid: ''
        })
      );
    }
  }, [dispatch, metricBody, reportBySelected?.value, reportSource]);

  return (
    <FormReactSelect
      name="api.report_by"
      label={t('reportBy')}
      labelBold
      placeholder={t('selectReportBy')}
      options={getReportByOptions({
        reportBy: reportSource,
        options:
          reportGroupType === ReportGroupTypes.ADVERTISER
            ? ReportBys
            : PublisherReportBys
      })}
    />
  );
};

export default ReportBySelect;

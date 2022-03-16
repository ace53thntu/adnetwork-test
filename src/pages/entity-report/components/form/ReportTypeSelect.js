//---> Build-in Modules
import React from 'react';

//---> External Modules
import moment from 'moment';
import {useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {FormReactSelect} from 'components/forms';
import {ReportTypes} from 'pages/entity-report/constants.js';

const ReportTypeSelect = ({defaultValue}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {control, setValue} = useFormContext();
  const reportTypeSelected = useWatch({name: 'report_type', control});
  const metricBody = useMetricsBodySelector();

  React.useEffect(() => {
    if (reportTypeSelected?.value !== defaultValue?.value) {
      setValue('api.start_time', new Date(), {
        shouldDirty: true,
        shouldValidate: true
      });
      setValue('api.end_time', null, {
        shouldDirty: true,
        shouldValidate: true
      });
    }
  }, [defaultValue, reportTypeSelected?.value, setValue]);

  React.useEffect(() => {
    if (reportTypeSelected?.value === 'distribution') {
      if (!metricBody?.start_time) {
        return;
      }

      if (
        metricBody?.end_time &&
        moment(metricBody?.start_time).isAfter(moment(metricBody?.end_time))
      ) {
        return;
      }
    }

    if (metricBody.report_type !== reportTypeSelected?.value) {
      dispatch(
        setMetricBodyRedux({
          ...metricBody,
          report_type: reportTypeSelected?.value
        })
      );
    }
  }, [dispatch, metricBody, reportTypeSelected?.value]);

  return (
    <FormReactSelect
      name="report_type"
      label={t('reportType')}
      placeholder={t('selectReportType')}
      options={ReportTypes}
      labelBold
    />
  );
};

export default ReportTypeSelect;

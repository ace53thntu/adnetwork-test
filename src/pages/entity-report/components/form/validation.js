import {yupResolver} from '@hookform/resolvers/yup';
import {ReportTypes} from 'constants/report';
import * as yup from 'yup';

export const schemaValidate = t => {
  const apiSchema = {
    time_unit: yup.string().when('time_range', (timeRange, schema) => {
      try {
        const timeRangeParsed = JSON.parse(timeRange);
        if (timeRangeParsed?.units.length > 1) {
          return yup.string().required().typeError(t('required'));
        }
      } catch (err) {
        return schema;
      }
    }),
    time_range: yup.string().required(t('required')).typeError(t('required')),
    report_by: yup
      .object()
      .nullable()
      .required(t('required'))
      .typeError(t('required')),
    start_time: yup.date(),
    end_time: yup.date()
  };

  return yupResolver(
    yup.object().shape({
      report_type: yup.object().nullable().required().typeError(t('required')),
      api: yup.object().when('report_type', reportType => {
        if (reportType?.value === ReportTypes.DISTRIBUTION) {
          return yup.object({
            ...apiSchema,
            start_time: yup
              .date()
              .required(t('required'))
              .typeError(t('required')),
            end_time: yup
              .date()
              .required(t('required'))
              .typeError(t('required'))
              .min(
                yup.ref(`start_time`),
                "End date can't be before start date"
              ),
            time_range: yup.string().notRequired()
          });
        }

        return yup.object(apiSchema);
      })
    })
  );
};

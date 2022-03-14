import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      api: yup.object({
        time_unit: yup.object().when('time_range', (timeRange, schema) => {
          try {
            const timeRangeParsed = JSON.parse(timeRange);
            if (timeRangeParsed?.units.length > 1) {
              return yup
                .object()
                .nullable()
                .required()
                .typeError('This field is required');
            }
          } catch (err) {
            return schema;
          }
        }),

        time_range: yup.string().required().typeError('This field is required')
      })
    })
  );
};

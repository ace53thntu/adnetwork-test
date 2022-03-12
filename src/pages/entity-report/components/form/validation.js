import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      api: yup.object({
        unit: yup.object().when('time_range', (timeRange, schema) => {
          if (timeRange?.units.length > 1) {
            return yup
              .object()
              .nullable()
              .required()
              .typeError('This field is required');
          }

          return schema;
        }),

        time_range: yup
          .object()
          .nullable()
          .required()
          .typeError('This field is required')
      })
    })
  );
};

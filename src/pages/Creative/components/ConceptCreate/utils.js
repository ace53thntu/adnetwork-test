import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

export const createConceptResolver = () => {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('Creative name is required.'),
      startTime: Yup.date().required('Start time is required.'),
      endTime: Yup.date()
        .nullable()
        .when('startTime', (startTime, schema) => {
          return (
            startTime &&
            schema.min(startTime, 'End time must be later than Start time.')
          );
        })
    })
  );
};

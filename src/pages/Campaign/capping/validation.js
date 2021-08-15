import * as yup from 'yup';

export const schemaValidate = t => {
  return yup.object().shape({
    ctype: yup.object().nullable().required(t('required')),
    time_frame: yup
      .number()
      .required(t('required'))
      .when('ctype', ({value}, schema) => {
        return value === 'IMP_USR' ? schema.max(5) : schema;
      })
      .typeError('Please enter a valid number'),
    climit: yup
      .number()
      .nullable()
      .min(0)
      .typeError('Please enter a valid number')
  });
};

export const schemaValidateWeekPart = t => {
  return yup.object().shape({
    week_days: yup
      .array()
      .of(yup.object().shape({num: yup.number()}))
      .required(t('required')),
    start_hour: yup
      .number()
      .min(0)
      .max(23)
      .typeError('Please enter a valid number')
      .required(t('required')),
    start_minute: yup
      .number()
      .min(0)
      .max(59)
      .required(t('required'))
      .typeError('Please enter a valid number'),
    end_hour: yup
      .number()
      .min(0)
      .max(23)
      .required(t('required'))
      .typeError('Please enter a valid number'),
    end_minute: yup
      .number()
      .min(0)
      .max(59)
      .required(t('required'))
      .typeError('Please enter a valid number')
  });
};

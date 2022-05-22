import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      name: yup.string().required(t('required')),
      domains: yup
        .array()
        .of(yup.object().nullable())
        .required(t('required'))
        .typeError(t('required'))
    })
  );
};

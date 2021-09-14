import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      username: yup.string().required(t('required')),
      email: yup.string().email('Invalid email format').required(t('required')),
      role: yup.object().required(t('required')).typeError(t('required'))
    })
  );
};

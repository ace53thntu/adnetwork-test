import {yupResolver} from '@hookform/resolvers/yup';
import {isValidURL} from 'utils/helpers/validations.helpers';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      name: yup.string().required(t('required')),
      url: yup
        .string()
        .required(t('required'))
        .test('is-url', 'Enter correct url!', value => {
          return isValidURL(value);
        }),
      domain: yup.object().required(t('required')).typeError(t('required'))
    })
  );
};

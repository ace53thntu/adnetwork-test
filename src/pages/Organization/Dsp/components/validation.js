import {yupResolver} from '@hookform/resolvers/yup';
import {isValidDomain, isValidURL} from 'utils/helpers/validations.helpers';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      name: yup.string().required(t('required')),
      bidding_url: yup
        .string()
        .required(t('required'))
        .test('is-url', 'Enter correct url!', value => {
          return isValidURL(value);
        }),
      domain: yup
        .string()
        .required(t('required'))
        .test('valid-domain', 'Invalid domain', val => isValidDomain(val))
        .typeError(t('required'))
    })
  );
};

import {yupResolver} from '@hookform/resolvers/yup';
import {isValidDomain} from 'utils/helpers/validations.helpers';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      name: yup.string().required(t('required')),
      domain: yup
        .string()
        .required(t('required'))
        .test('valid-domain', 'Invalid domain', val => isValidDomain(val))
    })
  );
};

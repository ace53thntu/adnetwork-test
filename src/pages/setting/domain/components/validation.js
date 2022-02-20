import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      domain: yup
        .string()
        .required(t('required'))
        .test('valid-domain', 'Invalid domain', val => {
          const regexDomain = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
          if (regexDomain.test(val)) {
            return true;
          }
          return false;
        })
    })
  );
};

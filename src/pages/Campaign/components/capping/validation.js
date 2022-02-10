import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const schemaValidate = t => {
  return yupResolver(
    yup.object().shape({
      target: yup
        .string()
        .required(t('required'))
        .test('is-float', 'Invalid number', value =>
          (value + '').match(VALID_NUMBER)
        )
        .typeError('Invalid number')
    })
  );
};

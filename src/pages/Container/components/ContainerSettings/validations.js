import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {isValidURL} from 'utils/helpers/validations.helpers';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const containerFormResolver = containers => {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string()
        .required('Container name is required.')
        .test('is-exist', 'Container name is invalid or exist.', value => {
          if (value?.length) {
            const currentName = value.trim().toLowerCase();
            const isInValidName =
              currentName.startsWith('demographic@') ||
              currentName.startsWith('keyword@') ||
              new RegExp(/^iab-\d{1,}@/gm).test(currentName) ||
              currentName.indexOf('@') >= 0;

            if (isInValidName) {
              return false;
            }
            return containers.every(
              container => container?.name?.trim().toLowerCase() !== currentName
            );
          }
          return true;
        }),
      url: Yup.string()
        .nullable()
        .notRequired()
        .test('is-url', 'Enter correct url!', value => {
          if (value.length) {
            return isValidURL(value);
          }
          return true;
        }),
      cost: Yup.string()
        .required('This field is required')
        .test('is-float', 'Invalid number', value =>
          (value + '').match(VALID_NUMBER)
        )
        .typeError('Invalid number')
    })
  );
};

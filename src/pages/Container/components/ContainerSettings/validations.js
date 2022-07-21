import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {isValidURL} from 'utils/helpers/validations.helpers';
import {USER_ROLE} from 'pages/user-management/constants';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const containerFormResolver = (containers, role) => {
  const baseSchema = {
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
      .required('This field is required')
      .test('is-url', 'Enter correct url!', value => {
        if (value.length) {
          return isValidURL(value);
        }
        return true;
      }),
    defaults: Yup.object().shape({
      deal_floor_price: Yup.string().test({
        name: 'floor_price',
        exclusive: false,
        params: {},
        message: 'The deal floor price must be greater than the floor price',
        test: function (value) {
          if (value !== undefined || value !== undefined) {
            return parseFloat(value) > parseFloat(this.parent?.floor_price);
          }
          return true;
        }
      })
    })
  };
  if ([USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)) {
    return yupResolver(
      Yup.object().shape({
        ...baseSchema,
        cost: Yup.string()
          .required('This field is required')
          .test('is-float', 'Invalid number', value =>
            (value + '').match(VALID_NUMBER)
          )
          .test(
            'is-max',
            'The Commission Cost must be between 0.01 and 0.99',
            value => parseFloat(value) <= 0.99 && parseFloat(value) >= 0.01
          )
          .typeError('Invalid number')
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      ...baseSchema
    })
  );
};

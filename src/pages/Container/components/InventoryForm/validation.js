import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {InputStatus} from 'constants/misc';
import {validateFloatInput} from 'utils/yupValidations';

export const validationInventory = () => {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('This field is required.'),
      type: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      market_type: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      format: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      position_uuid: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      price_engine: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      market_dsps: Yup.array()
        .nullable()
        .when('market_type', marketTypeVal => {
          if (marketTypeVal?.value === 'private') {
            return Yup.array()
              .required('This field is required.')
              .typeError('This field is required.');
          }
          return Yup.array().nullable().notRequired();
        }),
      floor_price: Yup.string().required('This field is required.'),
      deal_floor_price: Yup.string().when('allow_deal', value => {
        if (value === InputStatus.ACTIVE) {
          return Yup.string()
            .required('This field is required.')
            .test({
              name: 'floor_price',
              exclusive: false,
              params: {},
              // eslint-disable-next-line no-template-curly-in-string
              message:
                'The deal floor price must be greater than the floor price',
              test: function (value) {
                // You can access the budget global field with `this.parent`.
                return parseFloat(value) > parseFloat(this.parent?.floor_price);
              }
            });
        }
        return Yup.string().nullable().notRequired();
      }),
      metadata: Yup.object({
        width: Yup.string()
          .required('This field is required.')
          .test('is-number', 'Invalid number', value => {
            return validateFloatInput(value);
          }),
        height: Yup.string()
          .required('This field is required.')
          .test('is-number', 'Invalid number', value => {
            return validateFloatInput(value);
          }),
        duration: Yup.string().test('is-number', 'Invalid number', value => {
          return validateFloatInput(value);
        })
      })
    })
  );
};

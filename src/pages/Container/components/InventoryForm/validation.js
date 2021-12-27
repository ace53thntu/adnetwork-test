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
      deal_floor_price: Yup.string().when('enable_deal', value => {
        if (value === InputStatus.ACTIVE) {
          return Yup.string().required('This field is required.');
        }
        return Yup.string().nullable().notRequired();
      }),
      metadata: Yup.object({
        width: Yup.string().test('is-number', 'Invalid number', value => {
          return validateFloatInput(value);
        }),
        height: Yup.string().test('is-number', 'Invalid number', value => {
          return validateFloatInput(value);
        }),
        duration: Yup.string().test('is-number', 'Invalid number', value => {
          return validateFloatInput(value);
        })
      })
    })
  );
};

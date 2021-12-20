import {yupResolver} from '@hookform/resolvers/yup';
import {validateFloatInput} from 'utils/yupValidations';
import * as yup from 'yup';

export const filterSchema = t => {
  return yupResolver(
    yup.object().shape({
      format: yup.object().nullable(),
      type: yup.object().nullable(),
      floor_price: yup.string(),
      deal_price: yup.string(),
      fill_rate: yup.string().test('is-decimal', 'Invalid number', value => {
        return validateFloatInput(value);
      }),
      click_rate: yup.string().test('is-decimal', 'Invalid number', value => {
        return validateFloatInput(value);
      })
    })
  );
};

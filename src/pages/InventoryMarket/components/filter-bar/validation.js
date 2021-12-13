import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
const VALID_NUMBER = /^[\\+\\-]?\d*\.?\d+(?:[Ee][\\+\\-]?\d+)?$/;

export const filterSchema = t => {
  return yupResolver(
    yup.object().shape({
      format: yup.object().nullable(),
      type: yup.object().nullable(),
      floor_price: yup.string(),
      deal_price: yup.string(),
      fill_rate: yup.string().test('is-decimal', 'Invalid number', value => {
        if (!value) return true;
        return (value + '').match(VALID_NUMBER);
      }),
      click_rate: yup.string().test('is-decimal', 'Invalid number', value => {
        if (!value) return true;
        return (value + '').match(VALID_NUMBER);
      })
    })
  );
};

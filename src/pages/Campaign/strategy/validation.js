import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const VALID_NUMBER = /^\d*\.?\d*$/;
const REGEX_NUMBER = /^[0-9]*$/;

export const strategySchema = (isUpdate = false, t) => {
  return yupResolver(
    Yup.object().shape({
      campaign_uuid: Yup.object().nullable().required('This field is required'),
      strategy_type: Yup.object().nullable().required('This field is required'),
      name: Yup.string().required('This field is required'),
      start_at: Yup.date().required(t('required')).typeError(t('required')),
      end_at: Yup.date()
        .min(Yup.ref(`${'start_at'}`), "End date can't be before start date")
        .typeError(t('required')),
      cpm: Yup.string()
        .test('is-number', 'Invalid number', value =>
          (value + '').match(REGEX_NUMBER)
        )
        .typeError('Invalid number'),
      skip_delay: Yup.string()
        .test('is-number', 'Invalid number', value =>
          (value + '').match(REGEX_NUMBER)
        )
        .typeError('Invalid number'),
      view_rate_prediction: Yup.string()
        .test('is-float', 'Invalid number', value =>
          (value + '').match(VALID_NUMBER)
        )
        .typeError('Invalid number')
    })
  );
};

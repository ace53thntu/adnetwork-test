import {yupResolver} from '@hookform/resolvers/yup';
import {CappingTypes} from 'constants/misc';
import * as yup from 'yup';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const schemaValidate = (t, cappingType) => {
  if (
    [
      CappingTypes.BUDGET.value,
      CappingTypes.BUDGET_MANAGER.value,
      CappingTypes.IMPRESSION.value
    ].includes(cappingType)
  ) {
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
  }
  return yupResolver(
    yup.object().shape({
      // status: yup.string().required(t('required'))
    })
  );
};

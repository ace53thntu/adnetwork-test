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

export const schemaValidateCreateBudget = t => {
  return yupResolver(
    yup.object().shape({
      global: yup
        .string()
        .required(t('required'))
        .test(
          'is-number',
          'The budget global must be a integer number and greater than 0.',
          val => {
            if (!val) {
              return true;
            }

            const reg = /^\d+$/;
            const parsed = parseInt(val, 10);
            const isNumber = reg.test(val);
            if (isNumber && parsed > 0) {
              return true;
            }
            return false;
          }
        )
        .typeError('Invalid number'),
      daily: yup
        .string()
        .required(t('required'))
        .test(
          'is-number',
          'The budget daily must be a integer number and greater than 0.',
          val => {
            if (!val) {
              return true;
            }
            const reg = /^\d+$/;
            const parsed = parseInt(val, 10);
            const isNumber = reg.test(val);
            if (isNumber && parsed > 0) {
              return true;
            }
            return false;
          }
        )
        .test({
          name: 'global',
          exclusive: false,
          params: {},
          // eslint-disable-next-line no-template-curly-in-string
          message: 'The budget daily must be less than the global',
          test: function (value) {
            if (!value) {
              return true;
            }

            // You can access the budget global field with `this.parent`.
            return value && parseInt(value) < parseInt(this.parent?.global);
          }
        })
        .typeError('Invalid number')
    })
  );
};

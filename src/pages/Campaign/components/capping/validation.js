import {yupResolver} from '@hookform/resolvers/yup';
import {CappingReferenceTypes, CappingTypes} from 'constants/misc';
import * as yup from 'yup';

export const schemaValidate = (t, cappingType, referenceType) => {
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
          // .test('is-float', 'Invalid number. Only allow integer > 0', value => {
          //   const reg = /^\d+$/;
          //   const parsed = parseInt(value, 10);
          //   const isNumber = reg.test(value);
          //   if (isNumber && parsed > 0) {
          //     return true;
          //   }
          //   return false;
          // })
          .typeError('Invalid number. Only allow integer > 0')
      })
    );
  }
  return yupResolver(
    yup.object().shape({
      // status: yup.string().required(t('required'))
    })
  );
};

export const schemaValidateCreateBudget = (t, cappingType, referenceType) => {
  let baseSchema = {
    global: yup
      .string()
      .when('daily', (dailyValue, schema) => {
        if (!dailyValue) {
          return schema.required(t('required'));
        }
        return schema.notRequired();
      })
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
        name: 'not-allow-empty',
        exclusive: false,
        params: {},
        // eslint-disable-next-line no-template-curly-in-string
        message: "The budget daily and global don't allow empty together",
        test: function (value) {
          if (!value && !this.parent?.global) {
            return false;
          }

          return true;
        }
      })
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

          if (!this.parent?.global && value) {
            return true;
          }

          // You can access the budget global field with `this.parent`.
          return value && parseInt(value) < parseInt(this.parent?.global);
        }
      })
      .typeError('Invalid number')
  };
  if (
    cappingType === CappingTypes.USER.value &&
    referenceType === CappingReferenceTypes.STRATEGY
  ) {
    return yupResolver(
      yup.object().shape({
        ...baseSchema,
        target: yup
          .string()
          .test(
            'is-number',
            'The target must be a integer number and greater than 0.',
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
        time_frame: yup
          .string()
          .test(
            'is-number',
            'The time frame must be a integer number between 1 and 1440.',
            val => {
              if (!val) {
                return true;
              }

              const reg = /^\d+$/;
              const parsed = parseInt(val, 10);
              const isNumber = reg.test(val);
              if (isNumber && parsed > 0 && parsed < 24 * 60) {
                return true;
              }
              return false;
            }
          )
          .typeError('Invalid number')
      })
    );
  }
  return yupResolver(
    yup.object().shape({
      ...baseSchema
    })
  );
};

export const schemaValidateCreateSchedule = (t, isRequired = false) => {
  if (isRequired) {
    return yupResolver(
      yup.object().shape({
        week_days: yup.array().required(t('required')).typeError(t('required')),
        start_time: yup.date().required(t('required')).typeError(t('required')),
        end_time: yup
          .date()
          .required(t('required'))
          .min(yup.ref(`start_time`), "End date can't be before start date")
          .typeError(t('required'))
      })
    );
  }
  return yupResolver(
    yup.object().shape({
      week_days: yup.array().required(t('required')).typeError(t('required')),
      start_time: yup.date().notRequired(),
      end_time: yup
        .date()
        .notRequired()
        .min(yup.ref(`start_time`), "End date can't be before start date")
        .typeError(t('required'))
    })
  );
};

import {yupResolver} from '@hookform/resolvers/yup';
import {CappingTypes} from 'constants/misc';
import * as yup from 'yup';

export const schemaValidate = (t, cappingType, daily) => {
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
          .typeError('Invalid number. Only allow integer > 0')
      })
    );
  }

  if (cappingType === CappingTypes.USER.value) {
    return yupResolver(
      yup.object().shape({
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
          .test('not-null-together', t('required'), function (val) {
            if (this.parent?.time_frame && !val) {
              return false;
            }

            return true;
          })
          .test(
            'less-than-daily-target',
            t('FORM.CONFLICT_CAPPING_VALUE'),
            function (val) {
              // Custom daily time_frame < 1 day
              // Custom daily target < daily target (if exist)
              // custom target*86400/time_frame > target daily(if exist)
              if (daily) {
                if (parseInt(val) > parseInt(daily)) {
                  return false;
                }
                if (
                  (parseInt(val) * 86400) / parseInt(this.parent?.time_frame) <
                  parseInt(daily)
                ) {
                  return false;
                }
              }

              return true;
            }
          )
          .typeError('Invalid number'),
        time_frame: yup
          .string()
          .test(
            'is-number',
            'The time frame must be a integer number and greater than 0.',
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
          .test('less-than-24h', t('FORM.CONFLICT_CAPPING_VALUE'), val => {
            if (!val) {
              return true;
            }

            const reg = /^\d+$/;
            const parsed = parseInt(val, 10);
            const isNumber = reg.test(val);
            if (isNumber && parsed < 24 * 60) {
              return true;
            }
            return false;
          })
          .test('not-null-together', t('required'), function (val) {
            if (this.parent?.target && !val) {
              return false;
            }

            return true;
          })
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

export const schemaValidateCreateBudget = (t, cappingType) => {
  let baseSchema = {
    global: yup
      .string()
      .when(
        ['daily', 'target', 'time_frame'],
        (dailyValue, targetCustom, timeFrameCustom, schema) => {
          if (
            (targetCustom || timeFrameCustom) &&
            cappingType === CappingTypes.USER.value
          ) {
            return schema.notRequired(t('required'));
          }
          if (!dailyValue) {
            return schema.required(t('required'));
          }
          return schema.notRequired();
        }
      )
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
        message: "The budget daily and global don't allow empty together",
        test: function (value) {
          if (
            cappingType === CappingTypes.USER.value &&
            !value &&
            !this.parent?.global &&
            !this.parent?.target &&
            !this.parent?.time_frame
          ) {
            return false;
          }

          if (
            !value &&
            !this.parent?.global &&
            cappingType !== CappingTypes.USER.value
          ) {
            return false;
          }

          return true;
        }
      })
      .test({
        name: 'global',
        exclusive: false,
        params: {},
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

  if (cappingType === CappingTypes.USER.value) {
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
          .test('not-null-together', t('required'), function (val) {
            if (this.parent?.time_frame && !val) {
              return false;
            }

            return true;
          })
          .test(
            'less-than-daily-target',
            t('FORM.CONFLICT_CAPPING_VALUE'),
            function (val) {
              // Custom daily time_frame < 1 day
              // Custom daily target < daily target (if exist)
              // custom target*86400/time_frame > target daily(if exist)
              if (this.parent?.daily) {
                if (parseInt(val) > parseInt(this.parent?.daily)) {
                  return false;
                }
                if (
                  (parseInt(val) * 86400) / parseInt(this.parent?.time_frame) <
                  parseInt(this.parent?.daily)
                ) {
                  return false;
                }
              }

              return true;
            }
          )
          .typeError('Invalid number'),
        time_frame: yup
          .string()
          .test(
            'is-number',
            'The time frame must be a integer number and greater than 0.',
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
          .test('less-than-24h', t('FORM.CONFLICT_CAPPING_VALUE'), val => {
            if (!val) {
              return true;
            }

            const reg = /^\d+$/;
            const parsed = parseInt(val, 10);
            const isNumber = reg.test(val);
            if (isNumber && parsed < 24 * 60) {
              return true;
            }
            return false;
          })
          .test('not-null-together', t('required'), function (val) {
            if (this.parent?.target && !val) {
              return false;
            }

            return true;
          })
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

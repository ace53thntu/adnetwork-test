import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const strategySchema = (isUpdate = false, t, isCapping = false) => {
  if (isCapping) {
    const cappingSchema = {
      video_filter: Yup.object().shape({
        only_skipable: Yup.string(),
        only_unskipable: Yup.string().test({
          name: 'not_allow_true_together',
          exclusive: false,
          params: {},
          message:
            'Only skippable and Only unskippable are not allowed to set active together',
          test: function (value) {
            // You can access the budget global field with `this.parent`.
            if (this.parent?.only_skipable === 'true' && value === 'true') {
              return false;
            }

            return true;
          }
        })
      })
    };

    return yupResolver(
      Yup.object().shape({
        ...cappingSchema
      })
    );
  } else {
    // is description tab
    const descriptionSchema = {
      campaign_uuid: Yup.object().nullable().required(t('required')),
      strategy_type: Yup.object().nullable().required(t('required')),
      name: Yup.string().required(t('required')),
      start_time: Yup.date().required(t('required')).typeError(t('required')),
      end_time: Yup.date()
        .min(Yup.ref(`${'start_time'}`), "End date can't be before start date")
        .typeError(t('required')),
      click_commission: Yup.string()
        .nullable()
        .test('is-float', 'Invalid number', value =>
          (value + '').match(VALID_NUMBER)
        )
        .typeError('Invalid number'),
      inventories_bid: Yup.array()
        .of(
          Yup.object({
            uuid: Yup.string()
          })
        )
        .when('strategy_type', strategyType => {
          if (strategyType?.value === 'premium') {
            return Yup.array().required(t('required')).typeError(t('required'));
          }
          return Yup.array().nullable().notRequired();
        }),
      concept_uuids: Yup.array().nullable().notRequired()
    };

    if (isUpdate) {
      return yupResolver(
        Yup.object().shape({
          ...descriptionSchema
        })
      );
    }

    return yupResolver(
      Yup.object().shape({
        ...descriptionSchema,
        budget: Yup.object().shape({
          global: Yup.string().when('daily', (value, schema) => {
            if (!value) {
              return schema.required(
                'Budget global or budget daily is required'
              );
            }

            return schema;
          }),
          daily: Yup.string().test({
            name: 'global',
            exclusive: false,
            params: {},
            message: 'The budget daily must be less than the global',
            test: function (value) {
              if (!value) {
                return true;
              }

              // You can access the budget global field with `this.parent`.
              if (parseFloat(this.parent?.global) > 0) {
                return (
                  value && parseFloat(value) < parseFloat(this.parent?.global)
                );
              }

              return true;
            }
          })
        }),
        impression: Yup.object().shape({
          global: Yup.string().when('daily', (value, schema) => {
            if (!value) {
              return schema.required(
                'Budget global or budget daily is required'
              );
            }

            return schema;
          }),

          daily: Yup.string().test({
            name: 'is-global-max',
            exclusive: false,
            params: {},
            // eslint-disable-next-line no-template-curly-in-string
            message: 'The impression daily must be less than the global',
            test: function (value) {
              if (!value) {
                return true;
              }

              // You can access the budget global field with `this.parent`.
              if (parseFloat(this.parent?.global) > 0) {
                return parseFloat(value) < parseFloat(this.parent?.global);
              }

              return true;
            }
          })
        })
      })
    );
  }
};

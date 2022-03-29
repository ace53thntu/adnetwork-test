import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const VALID_NUMBER = /^\d*\.?\d*$/;

export const strategySchema = (isUpdate = false, t, isConcept = false) => {
  if (isConcept) {
    return yupResolver(
      Yup.object().shape({
        concept_uuids: Yup.array().nullable().notRequired()
        // .required(t('required'))
        // .typeError(t('required'))
      })
    );
  }

  const basicSchema = {
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

    sources: Yup.array().notRequired(),
    position_uuids: Yup.array().notRequired()
  };

  if (isUpdate) {
    return yupResolver(
      Yup.object().shape({
        ...basicSchema
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      ...basicSchema,
      budget: Yup.object().shape({
        global: Yup.string().when('daily', (value, schema) => {
          if (!value) {
            return schema.required('Budget global or budget daily is required');
          }

          return schema;
        }),
        // .test(
        //   'is-number',
        //   'The budget global must be a integer number and greater than 0.',
        //   val => {
        //     if (!val) {
        //       return true;
        //     }

        //     const reg = /^\d+$/;
        //     const parsed = parseInt(val, 10);
        //     const isNumber = reg.test(val);
        //     if (isNumber && parsed > 0) {
        //       return true;
        //     }
        //     return false;
        //   }
        // ),
        daily: Yup.string()

          // .test(
          //   'is-number',
          //   'The budget daily must be a integer number and greater than 0.',
          //   val => {
          //     if (!val) {
          //       return true;
          //     }
          //     const reg = /^\d+$/;
          //     const parsed = parseInt(val, 10);
          //     const isNumber = reg.test(val);
          //     if (isNumber && parsed > 0) {
          //       return true;
          //     }
          //     return false;
          //   }
          // )
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
            return schema.required('Budget global or budget daily is required');
          }

          return schema;
        }),
        // .test(
        //   'is-number',
        //   'The impression global must be a integer number and greater than 0.',
        //   val => {
        //     if (!val) {
        //       return true;
        //     }
        //     const reg = /^\d+$/;
        //     const parsed = parseInt(val, 10);
        //     const isNumber = reg.test(val);
        //     if (isNumber && parsed > 0) {
        //       return true;
        //     }
        //     return false;
        //   }
        // ),
        daily: Yup.string()
          // .test(
          //   'is-number',
          //   'The impression daily must be a integer number and greater than 0.',

          //   val => {
          //     if (!val) {
          //       return true;
          //     }
          //     const reg = /^\d+$/;
          //     const parsed = parseInt(val, 10);
          //     const isNumber = reg.test(val);
          //     if (isNumber && parsed > 0) {
          //       return true;
          //     }
          //     return false;
          //   }
          // )
          .test({
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
};

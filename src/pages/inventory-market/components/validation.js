import {yupResolver} from '@hookform/resolvers/yup';
import {validateFloatInput} from 'utils/yupValidations';
import * as yup from 'yup';
import {INPUTS_NAME} from '../constants';

export const schemaValidate = (t, isBid = false) => {
  if (isBid) {
    return yupResolver(
      yup.object().shape({
        [INPUTS_NAME.DSP_UUID]: yup
          .object()
          .required(t('required'))
          .typeError(t('required')),
        [INPUTS_NAME.START_AT]: yup
          .date()
          .required(t('required'))
          .typeError(t('required')),
        [INPUTS_NAME.END_AT]: yup
          .date()
          .min(
            yup.ref(`${INPUTS_NAME.START_AT}`),
            "End date can't be before start date"
          )
          .typeError(t('required')),
        [INPUTS_NAME.BUDGET]: yup.object().shape({
          [INPUTS_NAME.GLOBAL]: yup
            .string()
            .test(
              'is-number',
              'The budget global must be a integer number and greater than 0.',
              val => {
                const reg = /^\d+$/;
                const parsed = parseInt(val, 10);
                const isNumber = reg.test(val);
                if (isNumber && parsed > 0) {
                  return true;
                }
                return false;
              }
            ),
          [INPUTS_NAME.DAILY]: yup
            .string()
            .test(
              'is-number',
              'The budget daily must be a integer number and greater than 0.',
              val => {
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
              name: INPUTS_NAME.GLOBAL,
              exclusive: false,
              params: {},
              // eslint-disable-next-line no-template-curly-in-string
              message: 'The budget daily must be less than the global',
              test: function (value) {
                // You can access the budget global field with `this.parent`.
                return value < parseInt(this.parent?.[INPUTS_NAME.GLOBAL]);
              }
            })
        })
      })
    );
  }
  return yupResolver(
    yup.object().shape({
      [INPUTS_NAME.NAME]: yup.string().required(t('required')),
      [INPUTS_NAME.DSP_UUID]: yup
        .object()
        .required(t('required'))
        .typeError(t('required')),
      [INPUTS_NAME.START_AT]: yup
        .date()
        .required(t('required'))
        .typeError(t('required')),
      [INPUTS_NAME.END_AT]: yup
        .date()
        .min(
          yup.ref(`${INPUTS_NAME.START_AT}`),
          "End date can't be before start date"
        )
        .typeError(t('required')),
      [INPUTS_NAME.LIMIT_IMPRESSION]: yup
        .string()
        .test(
          'is-number',
          'The limit impression must be a integer number and greater than 0.',
          val => {
            const reg = /^\d+$/;
            const parsed = parseInt(val, 10);
            const isNumber = reg.test(val);

            if (isNumber && parsed > 0) {
              return true;
            }
            return false;
          }
        ),
      [INPUTS_NAME.DEAL_PRICE]: yup
        .string()
        .test(
          'is-float',
          'The deal price must be a integer number and greater than 0.',
          value => {
            if (!value) {
              return false;
            }
            return validateFloatInput(value);
          }
        )
    })
  );
};

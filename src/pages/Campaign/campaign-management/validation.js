import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {CAMPAIGN_KEYS} from '../constants';

export const validationCampaign = t => {
  return yupResolver(
    yup.object().shape({
      advertiser: yup.object().typeError('Required!'),
      name: yup.string().required('Required!'),
      [CAMPAIGN_KEYS.START_TIME]: yup
        .date()
        .required(t('required'))
        .typeError(t('required')),
      [CAMPAIGN_KEYS.END_TIME]: yup
        .date()
        .min(
          yup.ref(`${CAMPAIGN_KEYS.START_TIME}`),
          "End date can't be before start date"
        )
        .typeError(t('required')),
      [CAMPAIGN_KEYS.BUDGET]: yup.object().shape({
        [CAMPAIGN_KEYS.BUDGET_GLOBAL]: yup
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
        [CAMPAIGN_KEYS.BUDGET_DAILY]: yup
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
            name: CAMPAIGN_KEYS.BUDGET_GLOBAL,
            exclusive: false,
            params: {},
            // eslint-disable-next-line no-template-curly-in-string
            message: 'The budget daily must be less than the global',
            test: function (value) {
              // You can access the budget global field with `this.parent`.
              return (
                value < parseInt(this.parent?.[CAMPAIGN_KEYS.BUDGET_GLOBAL])
              );
            }
          })
      }),
      [CAMPAIGN_KEYS.IMPRESSION]: yup.object().shape({
        [CAMPAIGN_KEYS.BUDGET_GLOBAL]: yup
          .string()
          .test(
            'is-number',
            'The impression global must be a integer number and greater than 0.',
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
        [CAMPAIGN_KEYS.BUDGET_DAILY]: yup
          .string()
          .test(
            'is-number',
            'The impression daily must be a integer number and greater than 0.',
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
            name: CAMPAIGN_KEYS.BUDGET_GLOBAL,
            exclusive: false,
            params: {},
            // eslint-disable-next-line no-template-curly-in-string
            message: 'The impression daily must be less than the global',
            test: function (value) {
              // You can access the budget global field with `this.parent`.
              return (
                value < parseInt(this.parent?.[CAMPAIGN_KEYS.BUDGET_GLOBAL])
              );
            }
          })
      })
    })
  );
};
